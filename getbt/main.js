const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    // titleBarStyle:'hidden'
  })
  mainWindow.loadFile('./index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)



