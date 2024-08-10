require('electron-reload')(__dirname)

const { app, BrowserWindow, ipcMain, nativeTheme, Menu, dialog } = require('electron')
const path = require('path')
let mainWindow
let popup
// for iframes
nativeTheme.themeSource = 'dark'
ipcMain.handle('add_acc', () => {
  // console.log(BrowserWindow)
  if (popup) return
  popup = new BrowserWindow({
    width: 500,
    height: 450,
         // minWidth: 1100,
         // minHeight: 750,
    icon: path.join(__dirname, '../..', 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
         //   preload: path.join(__dirname, 'preload.js')
    }
  })
  popup.addListener('close', () => {
    popup = null
  })
  popup.loadFile('./html/addacc.html')
})
ipcMain.handle('settings_open', () => {
  // console.log(BrowserWindow)
  if (popup) return
  popup = new BrowserWindow({
    width: 500,
    height: 450,
         // minWidth: 1100,
         // minHeight: 750,
    icon: path.join(__dirname, '../..', 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
         //   preload: path.join(__dirname, 'preload.js')
    }
  })
  popup.addListener('close', () => {
    popup = null
  })
  popup.loadFile('./html/settings.html')
})
ipcMain.handle('download-key', async (_e, fingerprint) => {
  const filename = await dialog.showOpenDialogSync({
    properties: ['showHiddenFiles', 'openDirectory', 'dontAddToRecent'],
    defaultPath: app.getPath('downloads') || app.getPath('home'),
    title: 'Save pgp key'
    // filters: [{
    //     name: 'PGP key',
    //     extensions: ['pgp', 'asc', '*']
    // }],
    // properties: ['showHiddenFiles', 'openDirectory','dontAddToRecent'],
    // filters: []
  })
  // console.log(filename)
  const folder = filename[0]
  console.log(fingerprint, _e.fingerprint, _e)
  require('child_process').execSync(`wget "${fingerprint}"`, {cwd: folder})
})
ipcMain.handle(`account_switched`, () => {
  popup.close()
  mainWindow.focus()
  mainWindow.loadFile('./html/app.html')
})
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 1100,
    minHeight: 750,
    // transparent: false,
    // alwaysOnTop: true,
    focusable: true, // THIS IS THE KEY
    closable: true,
    frame: process.platform == 'win32',
    skipTaskbar: true,
    // fullscreenable: false,
    // maximizable: false,
    // resizable: false,
    icon: path.join(__dirname, 'assets/icon.png'),
    titleBarOverlay: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('./html/login.html')

  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  app.quit()
})
