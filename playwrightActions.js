const { chromium } = require('playwright');
const { productos, getProductoMasSimilar } = require('./utils/productos.js');
const { responseGroups } = require('./utils/data.js');
const { obtenerSaludo, reemplazarPlaceholdersMessages, calcularPrecioX2, calcularPrecioAumentado, searchNumber } = require('./utils/functions.js');
const fs = require('fs/promises');




async function scrollChats(pagina) {
    try {
        const chatsContainer = await pagina.$('div[class^="x78zum5 xdt5ytf x1iyjqo2 xs83m0k x1xzczws x6ikm8r x1rife3k x1n2onr6"]');

        await pagina.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
            console.log('Scroll realizado con exito');
        }, chatsContainer);

        await pagina.waitForTimeout(2000);

    } catch {
        console.log('Scrollbar de chats no encontrado');
    }
}


///////////////////////////////////////////////////////

async function startBrowser() {
    const browser = await chromium.launchPersistentContext('./session', {
        headless: false,
        channel: 'chromium',
        args: ['--start-maximized'],
    });

    return browser;
}

async function enterMessengerMarketplace(pagina) {
    try {
        await pagina.goto('https://www.messenger.com/marketplace/');
        await pagina.waitForLoadState('domcontentloaded');

        const emailInput = await pagina.$('input[name="email"]');
        await emailInput.fill('934519338');

        const passwordInput = await pagina.$('input[name="pass"]');
        await passwordInput.fill('gdavid @2004');

        await pagina.waitForTimeout(1000);

        const loginButton = await pagina.$('button[type="submit"]');
        await loginButton.click();

        await pagina.waitForLoadState('domcontentloaded');
    } catch (error) {
        console.log('\nError al ingresar a Messenger Marketplace Login (Puede que messenger ya este iniciado): ' + error);
    }

    // Enviar el resultado de vuelta al proceso de renderizado si es necesario
    // ventanaPrincipal.webContents.send('resultado-scraping', titulo);

}

// Carga la cantidad de chats requeridos teniendo en cuenta 
// que el maximo de chats que se pueden abrir es 50
async function cargarChatsRequeridos(pagina, cantChatsRequeridos) {
    try {
        // coge los elementos con link de marketplace y que perteneza al area chats
        const selector = `a[href*="/marketplace/t/"]:not([aria-current="page"])`;
        await pagina.waitForSelector(selector);
        let chatsRequeridosCargados = await pagina.$$(selector);

        while (chatsRequeridosCargados.length < cantChatsRequeridos && chatsRequeridosCargados.length <= 50) {
            await scrollChats(pagina);
            console.log(`Scrolling: ${chatsRequeridosCargados.length} chats requeridos cargados`);
            chatsRequeridosCargados = await pagina.$$(selector);
        }
    } catch (error) {
        console.log('\nNo se pudo cargar los chats requeridos: ' + error);
    }
}


async function getChats(pagina) {
    try {
        // coge los elementos con link de marketplace y que perteneza al area chats
        const selector = 'a[href*="/marketplace/t/"]:not([aria-current="page"])';
        await pagina.waitForSelector(selector, { timeout: 60000 });
        let chatsCargados = await pagina.$$(selector);        
        
        console.log('\nSe obtuvieron: ', chatsCargados.length, 'chats cargados');
        return chatsCargados;

    } catch (error) {
        console.log('\nNo se pudo obtener los chats: ' + error);    }
}


async function getChatProductTitles(pagina) {
    const titles = [];

    try {
        const titleTopbarMain = await pagina.$('div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1r8uery.x1iyjqo2.xs83m0k.xeuugli.x1qughib.x6s0dn4.xozqiw3.x1q0g3np.xexx8yu.xykv574.xbmpl8g.x4cne27.xifccgj');
        titles.push(await titleTopbarMain.innerText());
    } catch (error) {
        console.log('Error al obtener el titulo de la barra superior principal: ' + error);
    }
    
    try {
        const titleTopbarSecundary = await pagina.$('span[class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1xmvt09 x1pg5gke x1fcty0u xzsf02u x1yc453h x4zkp8e x3x7a5m xq9mrsl"]')
        titles.push(await titleTopbarSecundary.innerText());
    } catch (error) {
        console.log('Error al obtener el titulo de la barra superior secundaria: ' + error);
    }

    try {  
        const titleInChatMain = await pagina.$('span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1xmvt09.x1jchvi3.x1s688f.xzsf02u.x2b8uid.xudqn12.x3x7a5m.xq9mrsl');
        titles.push(await titleInChatMain.innerText());
    } catch (error) {
        console.log('Error al obtener el titulo principal dentro del chat' + error);
    }

    return titles;
}

async function sendMessages(pagina, messages) {
    try {
        messageInput = await pagina.$('div[class="xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f notranslate"]');
    
        for (const message of messages) {
            await messageInput.fill(message);
            await pagina.keyboard.press('Enter');
            await pagina.waitForTimeout(3000);
        }
        
        console.log('Mensajes enviados con correctamente');
    } catch (error) {
        console.log('Error al enviar mensajes: ' + error);
    }
}

// 3 tipos de chats: 
// los cargados: respondidos y no respondidos, 
// los revisados: nuevos y los que requieren atención personalizada 
// los respondidos o requeridos: nuevos

async function responderChats(pagina, cantChatsRequeridos) {
    let cantChatsRevisados = 0;
    let cantChatsRespondidos = 0;
    let urlsChatsAtencionPersonalizada = []
    let idsChatsRevisados = []; // ids obtenidas del href de cada chat
    let cantChatsCargados = 0;
    let cantChatsCargadosAnterior = 0;
    let ultimoChatCargado = null;  // Seguimiento del último chat procesado
        
    // El autoreply se completará cuando se respondan la cantidad requerida de chats
    let autoreplyCompleted = cantChatsRespondidos >= cantChatsRequeridos;
    
    try {    
        // Hacer clic en chats hasta alcanzar la cantidad requerida
        while (!autoreplyCompleted) {
            let chatsCargados = await getChats(pagina);
            cantChatsCargados = chatsCargados.length;

            // Después del scroll y obetener nuevamento la lista de todos los chats
            // Corta la lista para obetener solo los chats nuevos que se han cargado
            let chatsCargadosNuevos = ultimoChatCargado
                ? chatsCargados.slice(chatsCargados.indexOf(ultimoChatCargado) + 1)
                : chatsCargados;

            if (chatsCargadosNuevos.length === 0) {
                console.log('No hay más chats para procesar después del último chat procesado.');
                break;
            }
    
            // if (cantChatsCargados === cantChatsCargadosAnterior) {
            //     console.log('No se pudo cargar mas chats. Posiblemente ya se han respondido todos los chats nuevos disponibles en la cuenta.');
            //     break;
            // }
    
            paginaAuxiliar = pagina;
    
            for (const chat of chatsCargadosNuevos) {
                let textChat = await chat.innerText();
                let hrefChat = await chat.getAttribute('href');
                let idChat = parseInt( hrefChat.match(/\/t\/(\d+)\//)[1] );
                ultimoChatCargado = chat;
    
                // Verificar si el chat está en la lista de chats revisados
                let esChatRevisado = searchNumber(idChat, idsChatsRevisados);
    
                if (!(textChat.includes('Tú:')) && !(textChat.includes('You:')) && !esChatRevisado) {
                    await chat.click();
                    cantChatsRevisados++;
                    idsChatsRevisados.push(idChat);
                    
                    // Cuando messenger se recoarga por sí sola al abrir 51 chats, referenciarla nuevamente
                    if (cantChatsRevisados % 51 === 0 && cantChatsRevisados !== 0) {
                        console.log('\nRecargando la pagina...');
                        
                        await pagina.waitForLoadState('domcontentloaded');
                        await pagina.waitForTimeout(5000);
    
                        pagina = await paginaAuxiliar;
                        console.log('Pagina referenciada nuevamente');
    
                        break;
    
                    } else {
                        // Esperar un tiempo para cargar el chat
                        await pagina.waitForTimeout(1500);
                        
                        let chatProductTitles = await getChatProductTitles(pagina);
                        let chatProduct = getProductoMasSimilar(chatProductTitles, productos);
                        let producto = chatProduct.producto;
                        let similitud = chatProduct.similitud;
                        
                        let propMessages = {
                            saludo: obtenerSaludo(),
                            precioNormal: producto.precio,
                            precioAumentado: calcularPrecioAumentado(producto.precio),
                            precioX2: calcularPrecioX2(producto.precio),
                            descripcion: producto.descripcion,
                        };
                        
                        let responseGroup = [];
                        if (similitud > 0.6) {
                            responseGroup = responseGroups[1];
                        } else {
                            responseGroup = responseGroups[0];
                        }
    
                        let responseMessages = reemplazarPlaceholdersMessages(propMessages, responseGroup);
    
                        // Verificar si es un chat nuevo (no hay mensajes propios)
                        let ownMessages = await pagina.$$("div[class='x78zum5 x1iyjqo2 xs83m0k xeuugli x15zctf7']");
    
                        if (ownMessages.length === 0) {
                            await sendMessages(pagina, responseMessages)
                            cantChatsRespondidos++;
                            console.log(`\nCHAT RESPONDIDO NUM ${cantChatsRespondidos}`);
    
                        } else {
                            urlToMessenger = 'https://www.messenger.com' + hrefChat;
                            urlsChatsAtencionPersonalizada.push(urlToMessenger);
                            let clientMessages = await pagina.$$("div[class='x1gslohp x11i5rnm x12nagc x1mh8g0r x1yc453h x126k92a x18lvrbx']");
                            
                            console.log(`\nESTE CHAT REQUIERE ATENCION PERSONALIZADA`);
                            console.log('Mensajes del cliente:', await clientMessages[clientMessages.length - 1].innerText);
                            console.log('URL:', urlToMessenger);
                        }
    
                        console.log("Titulos del chat: ", chatProductTitles[0]);
                        console.log(`Producto similitud (${similitud*100}%): `, producto.nombre);
                        
                    }
    
                }
    
                autoreplyCompleted = cantChatsRespondidos >= cantChatsRequeridos;
    
                // Salir del bucle si se respondieron la cantidad requerida de chats
                if (autoreplyCompleted) {
                    break;
                } 
            }
    
            // // Si no se alcanzo la cantidad requerida, vuelve a hacer 
            // // scroll hasta cargar la cantidad faltante de chats requeridos
            if (!autoreplyCompleted) {
                console.log('\nCargando más chats requeridos...');
                cantChatsCargadosAnterior = cantChatsCargados;
                ultimoChatCargado = chatsCargados[cantChatsCargados.length - 1];
                scrollChats(pagina);
            }
        }
    
        console.log('\nSe revisaron', cantChatsRevisados, 'chats.');
        console.log('Se respondieron', cantChatsRespondidos, 'chats.');
        console.log('\nCHATS QUE REQUIEREN ATENCION PERSONALIZADA:',);
    
        for (const url of urlsChatsAtencionPersonalizada) {
            console.log(url);
        }  

    } catch (error) {
        console.log('\nCHATS QUE REQUIEREN ATENCION PERSONALIZADA:',);
        for (const url of urlsChatsAtencionPersonalizada) {
            console.log(url);
        } 

        await pagina.close();
        console.log('Error al responder chats: ' + error);
    }   
}


async function logginWhatsAppWeb(browser) {
    try {
        const pagina = await browser.pages()[0];
        await pagina.goto('https://web.whatsapp.com/');
        await pagina.waitForLoadState('domcontentloaded');

        // Esperar a que aparezca el elemento o pase un minuto
        await Promise.race([
            await pagina.waitForSelector("[id='side']", { timeout: 60000*3 }),
            new Promise(resolve => setTimeout(resolve, 60000*3)) // Esperar un minuto
        ]);

        console.log("Se detecto el elemento o ha pasado un minuto. Cerrando la pagina y el navegador.");

        // Cerrar la pagina y el navegador
        await pagina.close();
        await browser.close();
    } catch (error) {
        console.log('Error al ingresar a WhatsApp Web: ' + error);
    }
}




async function autoreplyProcess(browser) {
    const pagina = await browser.pages()[0];
    await enterMessengerMarketplace(pagina);
    await responderChats(pagina, 20000);
    await browser.close();   
}

module.exports = { 
    autoreplyProcess,
    logginWhatsAppWeb,
    startBrowser
};
