const Imap = require('imap');
const { simpleParser } = require('mailparser');
const MailMessageBuilder = require('../utils/mailMessageBuilder');
const events = require('events');
const { EventEmitter } = require('stream');
const { Socket } = require('net');
const CredentialsManager = require('../utils/credentialsManager');
const imapEventEmitter = new events.EventEmitter();

const GmailboxesMap = {
    "inbox" : "INBOX",
    "sent" : "[Gmail]/Sent Mail",
    "spam" : "[Gmail]/Spam",
    "drafts" : "[Gmail]/Drafts",
    "trash" : "[Gmail]/Trash",
}
const boxesMap = GmailboxesMap
const imapSettings = {
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    socket: new Socket(),
    tlsOptions: { rejectUnauthorized: false }
};

const fetchPerPage = 15;

let imap;
let currentPage;

function connect(configObj) {
    endConnection();

    imapSettings.user = configObj['login-email'];
    imapSettings.password = configObj['login-password'];
    imapSettings.host = configObj['imap'].ip
    imapSettings.port = configObj['imap'].port
    imapSettings.tls =configObj['imap'].secure == 'on'
    imapSettings._transport_obj = configObj
    imap = new Imap(imapSettings);

    imap.once('ready', onConnect);
    imap.once('error', onError);

    imap.connect();
}
function listBoxes() {
    // i HATE RAW IMAP
    // imapSettings.socket.write(`A1 list "" "*" \n`)
   return new Promise((res,rej) => imap.getBoxes((err,re) => { err  ? rej(err) : res(re)}))
}
function fetchBox(boxKey, page) {
    const creds  = new CredentialsManager()
    const bxMap = creds.getIndexCreds().boxes  || {}
    let box = bxMap[boxKey] || "INBOX";
    console.log(box)
    currentPage = page;
    imap.openBox(box, false, openBox);
}

function markAsSeen(uid) {
    imap.addFlags(uid, ['\\Seen'], onMessageMove);
}

function moveToBox(uid, box) {
    const creds  = new CredentialsManager()
    const bxMap = creds.getIndexCreds().boxes  || {}
    let bo = bxMap[box] || "INBOX";
    imap.move(uid, bo, onMessageMove)
}

function onMessageMove(err) {
    if (err) {
        imapEventEmitter.emit('error', err);
    }
}

function openBox(err, box) {
    if (err) {
        imapEventEmitter.emit('error', err);
        return;
    }
    getBoxMessage(box);
}

function getBoxMessage(box) {
    let boxTotal = box.messages.total;
    let messages = [];
    let messagesBuildCount = 0;

    if (boxTotal === 0) {
        onFetchEnd(messages, boxTotal);
        return;
    }

    let fetchTo = boxTotal;
    let fetchFrom = boxTotal - ((currentPage + 1) * fetchPerPage) + 1;
    fetchFrom = fetchFrom <= 0 ? 1 : fetchFrom;

    let fetchCount = Math.abs(fetchFrom - fetchTo) + 1;

    let messagesStream = imap.seq.fetch(`${fetchFrom}:${fetchTo}`, { bodies: [''] });

    messagesStream.on('message', function (msgEventEmitter) {
        let messageBuilder = new MailMessageBuilder();
        let messageBuildEventEmitter = new EventEmitter();
        let partCount = 0;

        msgEventEmitter.on('body', function (stream, info) {
            simpleParser(stream, async (err, parsedMessage) => {
                //console.log(parsedMessage);
                messageBuilder.setText(parsedMessage.text, parsedMessage.html, parsedMessage.textAsHtml)
                messageBuilder.setHeaders(parsedMessage.headers);
                messageBuilder.setMessageId(parsedMessage.messageId);
                messageBuilder.setAttachments(parsedMessage.attachments);
                messageBuildEventEmitter.emit('build');
            });
        });

        msgEventEmitter.once('attributes', attributes => {
            //console.log(attributes);
            messageBuilder.setAttributes(attributes);
            messageBuildEventEmitter.emit('build');
        });

        messageBuildEventEmitter.on('build', function() {
            partCount++;

            if (partCount == 2) {
                messagesBuildCount++;
                let message = messageBuilder.build();
                messages.push(message);

                if (messagesBuildCount == fetchCount) {
                    messages = messages.sort((m1, m2) => {
                        return m2.uid - m1.uid;
                    });

                    //console.log(messages);
                    onFetchEnd(messages, boxTotal);
                }
            }
        });

    });
}

function onConnect() {
    imapEventEmitter.emit("connect", imapSettings._transport_obj);
    listBoxes()
}

function onFetchEnd(messages, boxTotal) {
    imapEventEmitter.emit('fetchend', messages, boxTotal);
}

function onError(err) {
    imapEventEmitter.emit('error', err);
    console.log(err);
}

function endConnection() {
    if (imap) {
        imap.end();
    }
}

module.exports = {
    connect,
    imapEventEmitter,
    fetchBox,
    markAsSeen,
    moveToBox,
    listBoxes,
    endConnection
};