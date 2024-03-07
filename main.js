const { app, BrowserWindow, ipcMain } = require('electron');
const { startBrowser, autoreplyProcess, logginWhatsAppWeb } = require('./playwrightActions'); // Asegúrate de ajustar la ruta según la ubicación real

let ventanaPrincipal;

function crearVentana() {
    ventanaPrincipal = new BrowserWindow({
        width: 450,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // ventanaPrincipal.maximize();
    ventanaPrincipal.webContents.openDevTools(); // Abre la consola de desarrolladores
    ventanaPrincipal.loadFile('index.html');

    // Manejar acciones de Playwright en el proceso principal
    ipcMain.on('iniciar-autoresponder', async () => {
        let browser = await startBrowser();
        await autoreplyProcess(browser);
    });

    ipcMain.on('loggin-whatsapp', async () => {
        let browser = await startBrowser();
        await logginWhatsAppWeb(browser);
    });

    // ipcMain.on('finalizar-proceso', async () => {
        
    // });

}

app.whenReady().then(() => {
    crearVentana();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
