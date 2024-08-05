// const emailKey = "mailectron-email";
// const passwordKey = "mailectron-password";
let activeAccKey = "mymailapp-activeacc"
class CredentialsManager {
    constructor() {
        if(!localStorage.getItem('creds')) {
            localStorage.setItem('creds', '[]')
        }
    }
    /**
     * 
     * @param {} email 
     * @param {*} password 
     */
    setCredentials(creds = []) {
        
        // localStorage.setItem(emailKey, email);
        // localStorage.setItem(passwordKey, password);
    localStorage.setItem('creds', JSON.stringify(creds))
    }
    addCredentials(configObj) {
        configObj['email'] = configObj['login-email']
        configObj['password'] = configObj['login-password']
        const creds = this.getCredentials()
        creds.push(configObj)
        this.setCredentials(creds)
        // localStorage.setItem('creds', JSON.stringify(creds))
    }
    getEmail() {
        return this.getIndexCreds().email;
    }

    getPassword() {
        return this.getIndexCreds().password;
        // return localStorage.getItem(passwordKey);
    }

    getCredentials() {
        return JSON.parse(localStorage.getItem('creds') || "[]")
    }
    getActiveAccountIndex() {
        return parseInt(localStorage.getItem(activeAccKey) || '0')
    }
    setActiveAccount(index) {
        return localStorage.setItem(activeAccKey, index)
    }
getIndexCreds(index) {
if(!index) index = this.getActiveAccountIndex()
return this.getCredentials()[index]
}
    clearCredentials() {
localStorage.removeItem(activeAccKey)
localStorage.removeItem('creds')
    }

    isLoggedIn() {
 return Boolean(this.getIndexCreds())
    }
} 

module.exports = CredentialsManager;