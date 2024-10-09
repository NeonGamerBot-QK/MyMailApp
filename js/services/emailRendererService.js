const MailMessage = require("../models/mailMessage");
const FileSaver = require("../utils/fileSaver");
const ColorsGenerator = require("../utils/colorsGenerator");
const Common = require("../common");
const { dialog, app, ipcRenderer } = require("electron");
const messagesContainer = document.getElementById('messages');
const messageContentContainer = document.getElementById('message-content');
const menuIcons = document.querySelectorAll('.menu-icon');
const currentBoxText = document.getElementById('current-box-text');

function changeBox(box) {
    messagesContainer.innerHTML = '';
    messageContentContainer.innerHTML = '';

    currentBoxText.innerHTML = box;
    menuIcons.forEach(element => element.classList.remove('active'));
    document.getElementById(`${box}-menu`).classList.add('active');
}

function removeMessageFromList(uid) {
    messageContentContainer.innerHTML = '';
    document.querySelector(`[data-uid="${uid}"]`).remove();
}
function ShowHTML(title, html, isRaw) {
    messageContentContainer.innerHTML = '';
    messageContentContainer.innerHTML = `
    <div class="message-content-body">
        <div class="message-content-top">
            <h3 class="message-content-subject">${title}</h3>
        </div>
        <div id="iframe-content" class="message-content-text" style="text-align: center;" >
        ${isRaw ? html : ""}
        </div>
    </div>
`;
if(!isRaw) {
    document.getElementById('iframe-content').append(html)
}

}
window.ShowHTML = ShowHTML
var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
//extracted from my yahoo :P
const brands ={
    "https://saahild.com/favicon.png": ["no-reply@saahild.com"],
    "https://s.yimg.com/lb/brands/180x180_reddit.png": ["noreply@redditmail.com"],
    "https://s.yimg.com/lb/brands/180x180_microsoftstore.png":["microsoftstore@microsoftstore.microsoft.com"],"https://s.yimg.com/lb/brands/180x180_columbiauniversity.png":["hsp-office@columbia.edu"],"https://s.yimg.com/lb/brands/180x180_facebook.png":["notification@priority.facebookmail.com","friendupdates@facebookmail.com","messages@facebookmail.com","groupupdates@facebookmail.com","security@facebookmail.com","birthdays@facebookmail.com"],"https://s.yimg.com/lb/brands/180x180_linkedin.png":["notifications-noreply@linkedin.com","messages-noreply@linkedin.com","updates-noreply@linkedin.com"],"https://s.yimg.com/lb/brands/180x180_indeed.png":["donotreply@indeed.com"],"https://s.yimg.com/lb/brands/180x180_stevens.png":["donotreply@stevens.edu"],"https://s.yimg.com/lb/brands/180x180_instructure.png":["notifications@instructure.com"],"https://s.yimg.com/lb/brands/180x180_jetspizza.png":["crunchclub@jetspizza.com"],"https://s.yimg.com/lb/brands/180x180_iheart.png":["newsletters@e.iheart.com"],"https://s.yimg.com/lb/brands/180x180_github.png":["noreply@github.com"],"https://s.yimg.com/lb/brands/180x180_discordapp.png":["noreply@discord.com","notifications@discord.com"],"https://s.yimg.com/lb/brands/180x180_hallmark.png":["hallmark@esp.hallmark.com"],"https://s.yimg.com/lb/brands/180x180_google.png":["no-reply@accounts.google.com","noreply@google.com"],"https://s.yimg.com/lb/brands/180x180_oculus.png":["reply@dev.oculusvr.com"],"https://s.yimg.com/lb/brands/180x180_epicgames.png":["help@accts.epicgames.com"],"https://s.yimg.com/lb/brands/180x180_spotify.png":["no-reply@spotify.com","noreply@spotify.com"],"https://s.yimg.com/lb/brands/180x180_minecraft.png":["reply@engage.minecraft.net"],"https://s.yimg.com/lb/brands/180x180_yahoo.png":["info@service.comms.yahoo.net"],"https://s.yimg.com/lb/brands/180x180_facebookinc.png":["do_not_reply@email.meta.com"],"https://s.yimg.com/lb/brands/180x180_amazon.png":["no-reply@amazon.com"],"https://s.yimg.com/lb/brands/180x180_daveandbusters.png":["email@e.daveandbusters.com"],"https://s.yimg.com/lb/brands/180x180_penguinrandomhouse.png":["email@em.penguinrandomhouse.com"]}

function convertEmailToGravatar(email) {
    return `https://www.gravatar.com/avatar/${MD5(email.trim().toLowerCase())}?s=200&d=identicon`
}
async function getBrandAvatar(domain) {
if(sessionStorage.getItem('brandavatar_'+domain)) return `https://api.saahild.com/api/bimi/${domain}/icon`
// if(sessionStorage.getItem('brandavatar_'+domain)) return `https://s.yimg.com/lb/brands/180x180_${domain}.png`
// `https://s.yimg.com/lb/brands/180x180_${domain}.png`
return fetch(`https://api.saahild.com/api/bimi/${domain}/icon`).then((r) => {
    if(!r.ok) {
        throw new Error('Not valid...')
    } else { 
        // sessionStorage.set('brandavatar_'+domain, `https://s.yimg.com/lb/brands/180x180_${domain}.png`)
        sessionStorage.setItem('brandavatar_'+domain, `https://api.saahild.com/api/bimi/${domain}/icon`)
        return `https://api.saahild.com/api/bimi/${domain}/icon`
        // return `https://s.yimg.com/lb/brands/180x180_${domain}.png`
    }
})
}
const emails_to_force_gravatar = ['zeon@saahild.com', 'neon@saahild.com']
async function getAvatar(email, forceGravatar = false) {
    if(forceGravatar || emails_to_force_gravatar.includes(email)) return convertEmailToGravatar(email)
    if(Object.entries(brands).find(([k,v]) => v.some(e=>e.includes(email.split('@')[1])))) return Object.entries(brands).find(([k,v]) => v.some(e=>e.includes(email.split('@')[1])))[0]
    try {
        const fem_splits = email.split('@')[1].split('.')
        const fem = fem_splits.slice(fem_splits.length - 2).join('.')
        console.log(fem)
try {
return await getBrandAvatar(fem)
} catch (e) {
    return await getBrandAvatar(email.split('@')[1]) // try full subdomain
}
    } catch (e) {
    console.error(e)
    return convertEmailToGravatar(email)
}
}
function renderEmailList(messages, onEmailClick) {
    let html = '';

    //console.log(messages);

    messagesContainer.innerHTML = '';

    if (messages.length === 0) {
        messagesContainer.innerHTML = `
        <h4 class="centered">
            <i class="fa-solid fa-inbox"></i>
            No messages 
        </h4>`;
        return;
    }

    messages.forEach(async obj => {
        // obj.shortName = obj.shortName.replace('"', '')
        let msg = new MailMessage(obj);
        let seenClass = msg.isSeen() ? 'seen' : 'unseen';
        let div = document.createElement("div");

        div.classList.add('message', seenClass);
        div.setAttribute('data-uid', msg.uid);


        html = `
            <div class="message-header">
                <div class="status-dot"></div>

                <div class="message-date">${msg.dateString} </div>

                <div class="short-name-icon" style="background-color:${ColorsGenerator.shortNameToColor(msg.shortName)}">
                <img style="border-radius: 50%;" src="${await getAvatar(msg.fromEmail)}" alt="Avatar icon "/>

                </div>

                <div class="message-header-text">
                    <h4 class="message-name">${msg.fromName.replaceAll('"', '')}</h4>
                    <h4 class="message-subject">${msg.subject}</h4>
                </div>

            </div>

            <div class="message-text">
                ${msg.text}
            </div>
        `

        div.addEventListener('click', () => onEmailClick(msg.uid));
        div.innerHTML = html;
        messagesContainer.appendChild(div);
    });
}

async function renderEmailInfo(currentBox, messageObject, onDeleteClick, onSpamClick, onInboxClick) {
// var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}


// function convertEmailToGravatar(email) {
//     return `https://www.gravatar.com/avatar/${MD5(email.trim().toLowerCase())}?s=200&d=identicon`
// }
    let msg = new MailMessage(messageObject);

    //console.log(msg);
    document.querySelectorAll('.message').forEach(element => {
        element.classList.remove('active');
    });

    let attachmentsHtml = '';

    msg.attachments.forEach(atttachment => {
        attachmentsHtml += `
        <div class="attachment">
            <i class="fa-solid fa-file"></i>
            ${atttachment.filename}
        </div>
        `;
    })

    messageContentContainer.innerHTML = `
        <div class="message-content-header">

            <div class="short-name-icon" style="background-color:${ColorsGenerator.shortNameToColor(msg.shortName)}">
            <!--
                ${msg.shortName}
-->
                <img src="${await getAvatar(msg.fromEmail)}" alt="Avatar icon "/>
            </div>

            <div class="message-header-text">
                <h5 class="message-email-date">${msg.dateString}</h5>
                <h4 class="message-name" style="display: inline-flex;margin-right: 2px;"><span>${msg.fromName.replaceAll('"', '')}</span> <div id="email_actions"> </div></h4>
                <h5 class="message-email-from">${msg.fromEmail}</h5>
            </div>

        </div>

        <div class="message-content-body">
            <div class="message-content-top">
                <h3 class="message-content-subject" >${msg.subject}</h3>
                <div class="message-buttons">
                    <div class="message-button" title="Reply" id="reply-btn"><i class="fa-solid fa-reply"></i></div>
                    ${currentBox == 'spam' ? '' : '<div class="message-button" title="Spam" id="spam-btn"><i class="fa-solid fa-ban"></i></div>'}
                    ${currentBox == 'inbox' ? '' : '<div class="message-button" title="Move to INBOX" id="inbox-btn"><i class="fa-solid fa-envelope"></i></div>'}
                    ${currentBox == 'trash' ? '' : '<div class="message-button" title="Delete" id="delete-btn"><i class="fa-solid fa-trash"></i></div>'}
                </div>
            </div>
            <div class="attachments-list">
                ${attachmentsHtml}
            </div>
            <iframe id="iframe-content" class="message-content-text" >
            </iframe>
        </div>
    `;
const buttonToGetPGPKey = document.createElement(`button`)
buttonToGetPGPKey.innerHTML = `<i class="fa-solid fa-key"></i>`
buttonToGetPGPKey.onclick = () => {
    const email_to_query = msg.fromEmail
    // alert(email_to_query)
    // ATM mit is down but all the others match sooo 
    // ubuntu if found, get pgp key from https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xFDE995C28C7EE56337643A768A8B64515254CFC6
    const urls = [`https://pgp.mit.edu/pks/lookup?search=EMAIL_HERE&fingerprint=on&hash=on&exact=on&options=mr&op=index`,`https://keyserver.ubuntu.com/pks/lookup?search=EMAIL_HERE&fingerprint=on&hash=on&exact=on&options=mr&op=index`, `https://keys.openpgp.org/pks/lookup?search=EMAIL_HERE&op=index`, `https://keys.mailvelope.com/pks/lookup?search=EMAIL_HERE&fingerprint=on&hash=on&exact=on&options=mr&op=index`].map(e=>e.replace('EMAIL_HERE', encodeURIComponent(email_to_query)))
let shouldIstop = false;
    urls.forEach(async url => {
    fetch(url).then(r => {
        if(shouldIstop) return;
        if(!r.ok) {
            console.error(`No Key`)
            alert(`No key found on ${new URL(url).host}`) //TODO Replace with notify
            return;
        }
        r.text().then(t => {
            if(shouldIstop) return;
        shouldIstop = true;
            const fingerprint = (t.split('\n')[1].split(':')[1])
            // const a = document.createElement('a')
            // a.download = true 
            // a.href = `https://${new URL(url).host}/pks/lookup?op=get&search=0x${fingerprint}`
            // document.body.append(a)
            // a.click()
            // a.remove()
            // const filename = 
ipcRenderer.invoke(`download-key`, `https://${new URL(url).host}/pks/lookup?op=get&search=0x${fingerprint}`)
            // console.log(filename)
        })
    })
})
}

    document.getElementById('email_actions').append(buttonToGetPGPKey)
    let iframe = document.getElementById('iframe-content');
// TODO: add setting to inject css
    //     iframe.srcdoc += `<style>
//    :root {
//     --rosewater: #f5e0dc;
//     --flamingo: #f2cdcd;
//     --pink: #f5c2e7;
//     --mauve: #cba6f7;
//     --red: #f38ba8;
//     --maroon: #eba0ac;
//     --peach: #fab387;
//     --yellow: #f9e2af;
//     --green: #a6e3a1;
//     --teal: #94e2d5;
//     --sky: #89dceb;
//     --sapphire: #74c7ec;
//     --blue: #89b4fa;
//     --lavender: #b4befe;
//     --text: #cdd6f4;
//     --subtext1: #bac2de;
//     --subtext0: #a6adc8;
//     --overlay2: #9399b2;
//     --overlay1: #7f849c;
//     --overlay0: #6c7086;
//     --surface2: #585b70;
//     --surface1: #45475a;
//     --surface0: #313244;
//     --base: #1e1e2e;
//     --mantle: #181825;
//     --crust: #11111b;
//     }   
//     * {
//     color: #cdd6f4 !important;
//     }
// body,html {
//     background-color: #181825;
//     color: #cdd6f4 !important;
// }
// a {
//     color: #89b4fa;
// }
// a:hover {
//     color: #b4befe;
// }
// a:visited {
//     color: #cba6f7;
// } 
//     </style>`;
iframe.sandbox=""    
iframe.srcdoc += msg.html;
    
    iframe.onload = () => onIframeLoad(msg, onDeleteClick, onSpamClick, onInboxClick);
}

function onIframeLoad(msg, onDeleteClick, onSpamClick, onInboxClick) {
    let iframe = document.getElementById('iframe-content');

    document.querySelector(`[data-uid="${msg.uid}"]`).classList.toggle('active');
    document.querySelector(`[data-uid="${msg.uid}"]`).classList.add('seen');
    document.getElementById('delete-btn')?.addEventListener('click', () => onDeleteClick(msg.uid));
    document.getElementById('spam-btn')?.addEventListener('click', () => onSpamClick(msg.uid));
    document.getElementById('inbox-btn')?.addEventListener('click', () => onInboxClick(msg.uid));

    let attachments = document.querySelectorAll('.attachment');
    for (let i = 0; i < attachments.length; i++) {
        const attachment = msg.attachments[i];
        attachments[i].addEventListener('click', () => FileSaver.downloadFile(attachment.filename, attachment.content))
    }

    Common.openLinksInExternal(iframe.contentDocument);
}

module.exports = {
    renderEmailList,
    renderEmailInfo,
    changeBox,
    ShowHTML,
    removeMessageFromList
};