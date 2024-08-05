const { ipcRenderer } = require("electron");
const imapService = require("../js/services/imapService");
const CredentialsManager = require('../js/utils/credentialsManager');

const loginBtn = document.getElementById('login-btn');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');

const credentialsManager = new CredentialsManager();

let imapEventEmitter = imapService.imapEventEmitter;

// loginBtn.onclick = login;
// loginBtn.onclick = () => loginForm.submit()
document.getElementById('login-form').onsubmit = login
imapEventEmitter.on('connect', onConnect);
imapEventEmitter.on('error', onError);

function addXYDiv(title, prefix) {
    const parent = document.createElement('div')
    parent.className = `form-row`
    parent.id = prefix
    // const url = document
    const titleEl = document.createElement('h2')
    titleEl.innerText = title
    const divThatHoldsTheInputs = document.createElement('div')
    const XYIp  = document.createElement('input')
    const XYPort = document.createElement('input')
    const XYSecure = document.createElement('input')
    XYIp.className = `form-row`
    XYPort.className = `form-row`
    XYSecure.className = `form-row`
    XYIp.type = 'text'
    XYIp.required = true 
    XYIp.placeholder = `${prefix}.example.com`
    XYIp.id = `${prefix}-ip`
    XYPort.id = `${prefix}-port`
    XYSecure.id = `${prefix}-secure`
    XYPort.required = true 
    XYPort.type = 'number'
    XYSecure.type = 'checkbox'
    XYSecure.checked = true
    XYIp.name = XYIp.id 
    XYPort.name = XYPort.id 
    XYSecure.name = XYSecure.id 
    divThatHoldsTheInputs.append(XYIp)
    divThatHoldsTheInputs.append(XYPort)
    divThatHoldsTheInputs.append(XYSecure)
    // TODO: add labels bro
    parent.append(titleEl)
    parent.append(divThatHoldsTheInputs)
    return parent;
}
function login(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    // console.log(e.target.)
    var object = {};
    object['imap'] = {}
    object['smtp'] = {}
    formData.forEach(function(value, key){
        if(key.startsWith('imap')) {
            object['imap'][key.split('-')[1]] = value
        } else if (key.startsWith('smtp')) {
            object['smtp'][key.split('-')[1]] = value
        } else {
            object[key] = value;

        }
    });
    // let email = object['login-email'];
    // let password = object['login-password'];
    // console.log(object)
// debugger;
    if (loginForm.checkValidity() == false) {
        loginForm.reportValidity();
        return;
    }

    imapService.connect(object);
}

function onConnect(configObj) {
    // credentialsManager.addImap()
    credentialsManager.addCredentials(configObj);
    credentialsManager.setActiveAccount(credentialsManager.getActiveAccountIndex() + 1)
    ipcRenderer.invoke('account_switched')
}

function onError(error) {
    alert(error + "\n Check your credentials");
}
const imapDiv = addXYDiv('Imap', 'imap')
imapDiv.style.marginRight  = `10px`
const smtpDiv = addXYDiv('Smtp', 'smtp')
smtpDiv.style.marginLeft  = `10px`
document.getElementById('servercreds').append(imapDiv)
document.getElementById('servercreds').append(smtpDiv)
// old_is_configs()
const creds = [{
    email: "Gmail",
    smtp: {
        port: 465,
        ip: `smtp.gmail.com`,
        secure: 'on'
    },
    imap: {
        port: 993,
        ip: `imap.gmail.com`,
        secure: 'on'
    },
},...credentialsManager.getCredentials()]
document.getElementById('old_is_configs').innerHTML = `
<option selected value='new'>Select one (optional) </option>
`
const func = []
document.getElementById('old_is_configs').addEventListener('change', e => func[e.target.value]())
creds.forEach((c,i) => {

    const option = document.createElement('option')
    option.value = i 
    option.innerText = `${c.email} config`
    func[i] = () => {
        console.log("#option")
        const arr = [imapDiv, smtpDiv]
        for(const p of arr) {
            // p.querySelectorAll('input').forEach(input => {
            console.log(1)
                Object.entries(c[p.id]).forEach(([key,value]) => {
                    console.log(key, `#${p.id}-${key}`)
                    if(key == 'secure') {
                        document.querySelector(`#${p.id}-${key}`).checked = value == 'on'
                    } else {
                        document.querySelector(`#${p.id}-${key}`).value = value
                    }
                })
            // })
        }
    }
    document.getElementById('old_is_configs').append(option)
})