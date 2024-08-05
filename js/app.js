const imapService = require("../js/services/imapService.js");
const emailRendererService = require("../js/services/emailRendererService.js");
const messageSenderService = require("../js/services/messageSenderService.js");
const CredentialsManager = require('../js/utils/credentialsManager');
const { BrowserWindow, ipcRenderer } = require("electron");
const path = require("path");

const syncBtn = document.getElementById('sync-btn');
const syncLoadingIcon = document.getElementById('sync-loading-icon');
const logoutBtn = document.getElementById('logout-btn');

const credentialsManager = new CredentialsManager();
let imapEventEmitter = imapService.imapEventEmitter;
let messages = [];
let currentBox = "inbox";
let currentPage = 0;
let totalMessages = 0;

let messagesList = document.getElementById('messages');
let isScrollLoading = false;

syncBtn.onclick = refreshBox;
logoutBtn.onclick = logout;

initApp();

function initApp() {
    const  configObj = credentialsManager.getIndexCreds();
const { email, password } = configObj
    showLoading();
    document.title = `${email} - MyMailApp`;

    document.querySelectorAll('.menu-btn').forEach(element =>
        element.addEventListener('click', onMenuIconClick));

    document.getElementById('send-mail-menu').addEventListener('click', onSendMenuClick);

    imapEventEmitter.on('fetchend', onFetchEnd);
    imapEventEmitter.on('connect', onConnect);
    imapEventEmitter.on('error', onError);

    imapService.connect(configObj);
document.getElementById('addacc-btn').onclick = () => {
    // window.open(`login.html`)
ipcRenderer.invoke('add_acc')
}
document.getElementById('switchacc-btn').onclick = () => {
    // window.open(`login.html`)
// ipcRenderer.invoke('add_acc')
const div = document.createElement('div')
div.style.padding = `20px`;
const ul = document.createElement(`ul`)
const allCreds = credentialsManager.getCredentials()
allCreds.forEach((c,i) => {
    const li = document.createElement('li')
    li.style.fontSize = `2.5rem`
    li.style.marker = `none`
    li.style.listStyleType = `none`
    li.append(c.email)
    const trashEl = createTrashButton(c)
    const switchEl = createSwitchButton(i)
    li.append(switchEl)
    li.append(trashEl)
    ul.append(li)
})
div.append(ul)
emailRendererService.ShowHTML(`Account Manage`, div, false)
}

}
function createSwitchButton(index) {
    const button = document.createElement('button')
    button.onclick = () => {
        credentialsManager.setActiveAccount(index)
        location.reload()
    }
    button.style.border = 'none;'
    button.style.marginRight = `5px`;
    button.style.marginLeft = `15px`;
    button.innerHTML = `<i class="fa-solid fa-inbox" style="color: var(--mauve);"></i>`
    return button;
}
function createTrashButton(cred) {
    const button = document.createElement('button')
    button.onclick = () => {
        let currentCreds = credentialsManager.getCredentials()
        currentCreds = currentCreds.filter(c => c.email !== cred.email) 
        credentialsManager.setCredentials(currentCreds)
        credentialsManager.setActiveAccount(0)
        location.reload()
    }
    button.style.border = 'none;'
    button.style.marginRight = `5px`;
    button.style.marginLeft = `5px`;
    button.innerHTML = `<i class="fa-solid fa-trash" style="color: var(--red);"></i>`
    return button;
} 
function getMessages(box) {
    showLoading();
    imapService.fetchBox(box, currentPage);
}

function refreshBox() {
    getMessages(currentBox);
}

function onFetchEnd(receivedMessages, boxTotal) {
    messages = receivedMessages;
    totalMessages = boxTotal;

    hideLoading();
    emailRendererService.renderEmailList(messages, onEmailClick);
}

function onConnect() {
    getMessages("inbox");
}

function onError(error) {
    console.log(error);
}

function onEmailClick(uid) {
    let message = messages.find(msg => msg.uid === uid);
    if (message) {
        emailRendererService.renderEmailInfo(currentBox, message, onDeleteClick, onSpamClick, onInboxClick);
        if (!message.isSeen()) {
            imapService.markAsSeen(message.uid);
        }
    }
}

function onDeleteClick(uid) {
    if (confirm("Are you sure you want to delete this message?")) {
        emailRendererService.removeMessageFromList(uid);
        imapService.moveToBox(uid, "trash");
    }
}

function onSpamClick(uid) {
    if (confirm("Are you sure you want to mark this message as SPAM?")) {
        emailRendererService.removeMessageFromList(uid);
        imapService.moveToBox(uid, "spam");
    }
}

function onInboxClick(uid) {
    if (confirm("Are you sure you want to move this message to INBOX?")) {
        emailRendererService.removeMessageFromList(uid);
        imapService.moveToBox(uid, "inbox");
    }
}
function boxExists(box) {
    console.log(box)
const currentCreds = credentialsManager.getIndexCreds()
if(!currentCreds.boxes) {
return false
}
return Boolean(currentCreds.boxes[box])
}
async function onMenuIconClick(event) {
    let menuId = event.currentTarget.getAttribute('id');
    let box = menuId.split('-menu')[0];
    if(!boxExists(box) && !box.includes('inbox')) {
    const div = document.createElement('div')
    div.style.textAlign = `center`
    div.style.padding = `5px`
const selectMenu = document.createElement('select')
selectMenu.style.padding = `4px`
selectMenu.style.border = `none`
selectMenu.innerHTML = `<option selected disabled value='no'>Select One</option>`
// const defOpt = document.createElement('op ')
let allInboxes = await imapService.listBoxes()
console.log(allInboxes)
allInboxes = Object.entries(allInboxes).filter(([_,v]) => v.attribs.includes(`\\HasChildren`)).map(([key,value]) => {
    return Object.entries(value.children).map(([ke,val]) => {
        return {
            name: `${key}${value.delimiter}${ke}`,
            recommend_for: {
                // val.att i cant find them
            }
        }
    })
}).flat(1)
console.log(allInboxes)
allInboxes.forEach((b) => {
    const option = document.createElement('option')
    option.value = b.name 
    option.innerText = b.name
    if(b.recommend_for[box]) {
        option.innerText += ` (recommended)`
    }
    selectMenu.append(option)
})
selectMenu.onchange = e =>  {
    const useBox = e.target.value
    let currentCreds = credentialsManager.getCredentials()
    if (!currentCreds[credentialsManager.getActiveAccountIndex()].boxes) currentCreds[credentialsManager.getActiveAccountIndex()].boxes = {}
    currentCreds[credentialsManager.getActiveAccountIndex()].boxes[box] = useBox;
    // call it again cuz all OK now
    // onMenuIconClick(event);
    credentialsManager.setCredentials(currentCreds)
    // emailRendererService.changeBox(box);
    currentBox = box;
    currentPage = 0;
    emailRendererService.changeBox(box);
    getMessages(box);
}
div.append(selectMenu)
emailRendererService.ShowHTML(`Create box`, div, false)
// alert('uh box dont exist make one:3')
        return;
    }
    currentBox = box;
    currentPage = 0;
    emailRendererService.changeBox(box);
    getMessages(box);
}

function onSendMenuClick(event) {
    messageSenderService.renderSendForm();
}

function logout() {

    if(confirm(`Your are about to logout of all your accounts`)) {
        credentialsManager.clearCredentials();
    window.location.href = "login.html";
    imapService.endConnection();
    }
}

function loadMore() {
    getMessages(currentBox);
}

function showLoading() {
    isScrollLoading = true;
    document.getElementById('scroll-loader').style.display = 'block';
    syncLoadingIcon.classList.add('fa-spin');
}

function hideLoading() {
    isScrollLoading = false;
    syncLoadingIcon.classList.remove('fa-spin');
    document.getElementById('scroll-loader').style.display = 'none';
}

messagesList.addEventListener('scroll', function () {
    if (isScrollLoading == true || messagesList.scrollTop == 0 || messages.length >= totalMessages) {
        return;
    }

    if (messagesList.scrollTop + messagesList.clientHeight >= messagesList.scrollHeight - 10) {
        messagesList.scrollTop = messagesList.scrollHeight;

        currentPage++;
        showLoading();
        loadMore();
    }
});