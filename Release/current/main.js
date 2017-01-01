'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
var mainWindow = null;

app.on('window-all-closed', function(){
    app.quit();
});

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    frame: true,
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  globalShortcut.register('CommandOrControl+Q', () => {
    mainWindow.close();
    app.quit();
  });

  mainWindow.on('closed',function(){
    mainWindow = null;
  });
});
