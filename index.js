const { ipcRenderer } = require('electron');

document.getElementById('start-autoreply').addEventListener('click', () => {
    try {
        ipcRenderer.send('iniciar-autoresponder');
        console.log('Mensaje enviado al proceso: Autoresponder');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
});

document.getElementById('loggin-whatsapp').addEventListener('click', () => {
    try {
        ipcRenderer.send('loggin-whatsapp');
        console.log('Mensaje enviado al proceso: Loggin WhatsApp Web');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
});
