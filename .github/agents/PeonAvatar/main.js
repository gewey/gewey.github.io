const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');

let mainWindow;
const STATE_PATH = 'V:/scripts/people-ping/.state.json';
let lastEventId = null;

function createWindow() {
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = 250;
    const windowHeight = 250;

    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: screenWidth - windowWidth,
        y: screenHeight - windowHeight,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Make window click-through
    mainWindow.setIgnoreMouseEvents(true, { forward: true });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    // Start polling peon-ping state
    setInterval(pollState, 200);
}

async function pollState() {
    try {
        if (await fs.pathExists(STATE_PATH)) {
            const state = await fs.readJson(STATE_PATH);
            if (state.last_event && state.last_event.id !== lastEventId) {
                lastEventId = state.last_event.id;
                mainWindow.webContents.send('peon-event', state.last_event);
            }
        }
    } catch (err) {
        console.error('Error polling peon state:', err);
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
