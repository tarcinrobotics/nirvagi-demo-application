const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets', 'favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true
        },
        title: 'Nirvagi - Demo Edition'
    });

    // Load your Odoo application
    mainWindow.loadURL('https://nirvagi-demo.tarcinrobotic.in');

    // Block Ctrl+Shift+I
    globalShortcut.register('Control+Shift+I', () => {
        // Do nothing or show a message, etc.
    });

    // Optionally block other shortcuts like F12
    globalShortcut.register('F12', () => {
        // Do nothing or show a message, etc.
    });

    const menuTemplate = [
        {
            label: '\u25C0',
            accelerator: 'Alt+Left',
            click: () => mainWindow.webContents.goBack()
        },
        {
            label: '\u25B6',
            accelerator: 'Alt+Right',
            click: () => mainWindow.webContents.goForward()
        },
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R', // Shortcut for reloading the page
            click: () => mainWindow.webContents.reload()
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.on('did-finish-load', () => {
        console.log('CSS injected successfully');
        mainWindow.webContents.insertCSS(`
            .menu-item-back {
                background-image: url('assets/backward.png');
                background-repeat: no-repeat;
                background-size: 20px 20px;
                padding-left: 30px;
            }

            .menu-item-forward {
                background-image: url('assets/forward.png');
                background-repeat: no-repeat;
                background-size: 20px 20px;
                padding-left: 30px;
            }
        `);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
