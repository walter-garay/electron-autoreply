const { chromium } = require('playwright');


async function scrollChats(pagina) {
    try {
        await pagina.evaluate(() => {
            const chatsContainer = document.querySelector('div[class^="x78zum5 xdt5ytf x1iyjqo2 xs83m0k x1xzczws x6ikm8r x1rife3k x1n2onr6"]');
            if (chatsContainer) {
                chatsContainer.scrollIntoView(alignToTop);
            }
        });
        await pagina.waitForTimeout(2000);
        console.log('Scroll realizado con éxito');
    } catch (error) {
        console.error('Error al hacer scroll en chats:', error);
    }
}


async function abrirNavegador() {
    try {
        const browserContext = await chromium.launchPersistentContext('./testSession', { headless: false });
        const page = await browserContext.newPage();
        return page;
    } catch (error) {
        console.error('Error al abrir el navegador:', error);
        throw error;
    }
}


async function ingresarMessenger(page) {

    try {
        // Ir a la página de Messenger
        await page.goto('https://www.messenger.com/marketplace/t/7298495653523201/');

        const emailInput = await page.$('input[name="email"]');
        await emailInput.fill('934519338');

        const passwordInput = await page.$('input[name="pass"]');
        await passwordInput.fill('gdavid @2004');

        await page.waitForTimeout(1000);

        const loginButton = await page.$('button[type="submit"]');
        await loginButton.click();

        await page.waitForTimeout(12000);

    } catch (error) {
        console.error('Error al ingresar a Messenger:', error);
    }

    return page;
}


async function cargarImagenEnMessenger(page) {

    try {
        // Ir a la página de Messenger

        // Seleccionar el input de carga de archivos (puede variar según la estructura HTML específica)
        await page.waitForTimeout(18000);
        const messageInput = await page.$('input[class="x1s85apg"]');

        // Ruta de la imagen que deseas cargar
        const imagePath = 'https://www.ensalza.com/blog/wp-content/uploads/que-es-jpg.png';

        // Subir la imagen al input de archivos
        await messageInput.setInputFiles(imagePath);

        // Puedes esperar a que la carga de archivos esté completa si es necesario
        await page.waitForLoadState('load'); // O 'domcontentloaded' u otro estado según tus necesidades



        // Cerrar el navegador
        // await browser.close();
    } catch (error) {
        console.error('Error al ejecutar el proceso:', error);
    }
}


(async () => {
    let pagina = await abrirNavegador();
    await ingresarMessenger(pagina);
    await scrollChats(pagina);
    await scrollChats(pagina);
})();

// buscador 
// hay 2, el buscador y el inputchat
// $("div[role='textbox']")

// chat 
// en innertext debe haber "(Tú)" o ("You")
// $("div[class='_199zF _3j691 _2IMPQ']")

// inputchat 1
// $("div[class='_1VZX7
// ']")

// numberMessage
// validar con que contenga el número en el innertext
// $$('div[class="cm280p3y to2l77zo n1yiu2zv c6f98ldp ooty25bp oq31bsqd"]')