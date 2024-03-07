function obtenerSaludo() {
    const horaActual = new Date().getHours();

    let saludo;

    if (horaActual >= 5 && horaActual < 12) {
        saludo = "Buenos días";
    } else if (horaActual >= 12 && horaActual < 18) {
        saludo = "Buenas tardes";
    } else {
        saludo = "Buenas noches";
    }

    return saludo;
}

function calcularPrecioAumentado(precio) {
    let aumento;

    if (precio <= 20) {
        aumento = 0.2;
    } else if (precio <= 120) {
        aumento = 0.16;
    } else {
        aumento = 0.06;
    }

    return Math.floor(precio * (1 + aumento)) + 0.9;
}

function calcularPrecioX2(precio) {
    let descuento;

    if (precio <= 27) {
        descuento = 0.09;
    } else if (precio <= 120) {
        descuento = 0.07;
    } else {
        descuento = 0.05;
    }

    return Math.round(precio * 2 * (1 - descuento));
}

// Devuelve el porcentaje del 0 al 1
function calcularSimilitudStrings(str1, str2) {
    const getWordFrequency = (str) => {
    const words = str.split(/\s+/);
    const frequency = {};
    for (const word of words) {
        frequency[word] = (frequency[word] || 0) + 1;
    }
    return frequency;
    };

    const getDotProduct = (vec1, vec2) => {
    let product = 0;
    for (const key in vec1) {
        product += (vec1[key] || 0) * (vec2[key] || 0);
    }
    return product;
    };

    const magnitude = (vec) => {
    let sum = 0;
    for (const key in vec) {
        sum += (vec[key] || 0) ** 2;
    }
    return Math.sqrt(sum);
    };

    const frequency1 = getWordFrequency(str1);
    const frequency2 = getWordFrequency(str2);
    const dotProduct = getDotProduct(frequency1, frequency2);
    const mag1 = magnitude(frequency1);
    const mag2 = magnitude(frequency2);

    if (mag1 === 0 || mag2 === 0) {
    return 0;
    } else {

    return ((dotProduct / (mag1 * mag2))).toFixed(5);
    }
}


function reemplazarPlaceholdersMessages(props, textArrays) {
    const propKeys = Object.keys(props);

    // Crear un nuevo array para almacenar los resultados
    const resultados = [];

    // Recorrer cada elemento del array de textos
    for (let i = 0; i < textArrays.length; i++) {
        let texto = textArrays[i];

        // Buscar y reemplazar placeholders en el texto
        propKeys.forEach(key => {
            const placeholder = new RegExp(`{${key}}`, 'g');
            const valor = props[key];
            texto = texto.replace(placeholder, valor);
        });

        // Actualizar el nuevo array con el texto modificado
        resultados.push(texto);
    }

    // Eliminar placeholders no reemplazados y espacios adicionales
    for (let i = 0; i < resultados.length; i++) {
        resultados[i] = resultados[i].replace(/\{[a-zA-Z0-9]+\}/g, '').replace(/\s+/g, ' ').trim();
    }

    return resultados;
}

// Eficiente para saher si una numero esta en un array no ordenado 
const searchNumber = (numero, array) => {
    return array.indexOf(numero) !== -1;
};


// Exportar todas las funciones del modulo
module.exports = {
    calcularPrecioAumentado,
    calcularPrecioX2,

    calcularSimilitudStrings,
    obtenerSaludo,
    reemplazarPlaceholdersMessages,
    searchNumber,
};
