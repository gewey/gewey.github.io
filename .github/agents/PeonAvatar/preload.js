const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onPeonEvent: (callback) => ipcRenderer.on('peon-event', (_event, value) => callback(value))
});
