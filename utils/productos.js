const { calcularSimilitudStrings } = require('./functions.js');


const productos = [
	{
		nombre: "audifonos inalambricos i7s tws - diseño casual y elegante - calidad de audio y multifunciones",
		precio: 28,
		descripcion: "Gran calidad de audio con microfono integrado y botón para controlar las llamadas y músicas. Colores: blanco, negro, rosado, amarillo, verde y celeste"
	},
	{
		nombre: "plantillas ortopédicas correctoras para pies valgus, varus, fascitis plantar",
		precio: 20,
		descripcion: "Dos tamaños: niños - adultos"
	},
	{
		nombre: "collar de cuarzo de fantasía individual y para parejas - luminiscentes brillan en la oscuridad",
		precio: 15,
		descripcion: "Y los duales a S/25 (2 collares) vienen con corazón inamantado + una cajita de regalo con dedicatoria. Colores: Verde y celeste luminiscentes"
	},
	{
		nombre: "lapicero giratorio - spinner antiestres",
		precio: 12,
		descripcion: ""
	},
	{
		nombre: "zapatillas dc originales - moda urbano skater",
		precio: 219,
		descripcion: "Zapatillas DC, top moda urbana. En todas las tallas, se puede probar"
	},
	{
		nombre: "SOFÁ CAMA PLEGABLE - COLCHONETA FORLI",
		precio: 120,
		descripcion: "Son de tres secciones, cada sección tiene su propio cierre para poderlo lavar"
	},
	{
		nombre: "PROTECTORES ANTIARRUGAS PARA ZAPATILLAS - SNEAKERS SHIELDS",
		precio: 15,
		descripcion: "Disponible en blanco y negro. Vienen en talla chica S y talla grande L. Todas tienen lineas de recorte para que lo pueda ajustar exactamente a su talla"
	},
	{
		nombre: "CARGADOR MAGNETICO XIAOMI MI BAND 5, 6, Y 7 - RELOJ Y PULSERA INTELIGENTE",
		precio: 15,
		descripcion: ""
	},
	{
		nombre: "RASPADOR + LIMPIADOR DE LENGUA 2X1 DE ACERO INOXIDABLE",
		precio: 22,
		descripcion: "Incluye: Raspador en U + limpiador cucharilla. Limpieza total para prevenir enfermedades bucales y mantén un buen aliento"
	},
	{
		nombre: "RELOJES DE CUARZO ELEGANTE CON CALENDARIO DE DISEÑO CLÁSICO",
		precio: 38,

		descripcion: ""
	},
	{
		nombre: "PACK LAPICES INFINITOS DE ESCRITURA ILIMITADA CON TAPA Y BORRADOR - SIN MANCHAS Y BORRABLE LAPIZ",
		precio: 15,
		descripcion: "Cada pack incluye: 4 lápices infinitos con tapa y borrador. No manchan debido a que no usan grafito"
	},
	{
		nombre: "EJERCITADOR DE MANDIBULA - TONIFICADOR MUSCULAR DE GEL",
		precio: 20,
		descripcion: "Define la mandíbula, cuello y tonifica músculos faciales eliminando la papada y demás excesos"
	},
	{
		nombre: "KPOP TARJETAS FOTOGRÁFICAS COLECCIONABLES - CARTAS LOMOCARDS",
		precio: 30,
		descripcion: ""
	},
	{
		nombre: "TAPONES ANTIPOLVO PARA ENTRADAS DE PERIFERICOS Y CABLES - COMPUTADORA",
		precio: 10,
		descripcion: ""
	},
	{
		nombre: "DIARIO PLANIFICADOR DE TAPA DURA DE DESARROLLO PERSONAL",
		precio: 39,
		descripcion: ""
	},
	{
		nombre: "KIT EXTRACTOR REMOVEDOR DE ESPNILLAS, PUNTOS NEGROS, COMEDONES Y ACN",
		precio: 15,
		descripcion: ""
	},
	{
		nombre: "TRAJE IMPERMEABLE PARA LLUVIA CON CAPUCHA Y AJUSTABLE",
		precio: 24,
		descripcion: "Traje impermeable con capucha ajustable y botones"
	},
	{
		nombre: "PIEDRA DE ALUMBRE PULIDA PARA PIEL - DESODORANTE Y ACLARANTE 100%",
		precio: 15,
		descripcion: "Piedras de alumbre pulidas para usar en la piel, de tamaño grande para 10 meses de uso y con su cajita duplex para guardarlo después de cada uso."
	},
	{
		nombre: "CORRECTOR DE DEDO PULGAR DEL PIE - SEPARADOR DE JUANETE Y DEDO TORCIDO",
		precio: 16,
		descripcion: "Tallas para adultos y niños: varón y mujer. Incluye: 2 correctores"
	},
	{
		nombre: "TARJETAS FOTOGRAFICAS DE K-POP - BTS / STRAYKIDS / TXT / BLACKPINK / ETC - CARTAS LOMOCARDS",
		precio: 20,
		descripcion: "Cada pack viene sellado, incluyen 54-55 tarjetas grupales e individuales exclusivas de su banda"
	},
	{
		nombre: "EJERCITADOR DE BRAZO - FORTALECE MUSCULOS DEL BRAZO Y MARCA VENAS",
		precio: 25,
		descripcion: "Ejercitador de brazo regulable de 5-60 Kg"
	},
	{
		nombre: "RELOJ PULSERA INTELIGENTE SMARTBAND M6 - ANTIPOLVO Y ANTIHUMEDAD",
		precio: 28,
		descripcion: ""
	},
	{
		nombre: "MUÑECOS DE NARUTO - FIGURAS DE ACCION DE ANIME",
		precio: 12,
		descripcion: ""
	},
	{
		nombre: "LAPICERO ARCOIRIS RETRACTIL MULTICOLOR 6 EN 1 - DISEÑO BONITO",
		precio: 6,
		descripcion: "Lapicero arcoiris 6 colores en 1"
	},
	{
		nombre: "LIMPIADOR DE PANTALLAS 2 EN 1 - SPRAY Y MICROFIBRA",
		precio: 15,
		descripcion: ""
	},
	{
		nombre: "TAPONES PARA OIDOS ANTIRRUIDO - IDEAL PARA DORMIR Y CONCENTRARSE",
		precio: 12,
		descripcion: "Incluye: 2 tapones + capsulera para llevarlo a cualquier lugar y mantenerlos limpios"
	},
	{
		nombre: "SOPORTE DE CELULAR PARA BICICLETA Y MOTO AJUSTABLE 360 GRADOS",
		precio: 16,
		descripcion: ""
	},
	{
		nombre: "PULSERA DE ACERO INOXIDABLE CON DOBLE CADENA Y CRUZ PARA HOMBRE Y MUJER",
		precio: 18,
		descripcion: "Pulsera a la moda de acero inoxidable con cadena doble y crucifijo"
	},
	{
		nombre: "PIEDRA DE ALUMBRE - DESODORANTE 100% NATURAL",
		precio: 18,
		descripcion: "Piedras de alumbre pulidas para usar en la piel, de tamaño grande para 15 meses de uso y con su cajita duplex para guardarlo después de cada uso."
	},
	{
		nombre: "SOFÁ CAMA - COLCHONETA PLEGABLE",
		precio: 110,
		descripcion: ""
	},
	{
		nombre: "PLANTILLAS ELEVADORAS DE ESTATURA - AUMENTA ALTURA - ORTOPEDICAS VISCOLASTICAS ANTIDESLIZANTES",
		precio: 16,
		descripcion: "Disponible en 3 alturas: 1.5, 2.5. El de 3.5cm (S/18)"
	},
	{
		nombre: "MAQUINAS EXPENDEDORAS DE DULCES Y JUEGUETES - CHICLERA PARA NEGOCIOS Y LUGARES CON AFLUENCIA",
		precio: 480,
		descripcion: "El negocio de las máquinas se trabaja solo. Las puede colocar en su local propio o en el de otra persona llegando a un acuerdo. ´Admite: chicles, pimpones y cápsulas con juguete, cada uno sale con S/1. Solo va y retira el dinero recaudado. La promoción incluye: Máquina + stand cromado + stickers + instalación gratuita + bolsa de 200 chicles"
	},
	{
		nombre: "PROTECTOR ANTIARRUGAS PARA ZAPATILLAS",
		precio: 18,
		descripcion: "Incluye: 2 protectores (izquierda y derecha). Vienen en talla S y talla L. Todas tienen lineas de recorte para que lo pueda ajustar exactamente a su talla. Colores: en blanco y negro"
	},
	{
		nombre: "ANTIFAZ + TAPONES ANTIRRUIDO PARA DORMIR Y MEJORAR SALUD DEL SUEÑO, AUMENTA ENERGÍA Y REDUCE OJERAS",
		precio: 18,
		descripcion: "Combo: Antifaz + tapones antirruido. Para tener un sueño reparador. Colores de tapones disponibles: Azul, naranja, blanco, amarillo, verde y rosado."
	},
	{
		nombre: "K-POP TARJETAS FOTOGRÁFICAS COLECCIONABLES EXCLUSIVAS PHOTOCARDS - OFERTA STOCK LIMITADO",
		precio: 28,
		descripcion: "Aún nos quedan disponibles en varios modelos"
	},
	{
		nombre: "collar de trebol plegable con corazones entrelazados - acero inoxidable - modelo en tendencia",
		precio: 25,
		descripcion: "Color: dorado y plateado"
	},
	{
		nombre: "EJERCITADORES DE MANDIBULA 2EN1 CON CAPSULERA - JAWLINER DEFINE MUSCULOS FASCIALES - ELIMINA PAPADA",
		precio: 20,
		descripcion: "Cada kit (S/20) incluye 2 ejercitadores + capsulera para llevarlo a cualquier lugar y mantenerlo limpio. Colores: negro, blanco y gris"
	},
	{
		nombre: "BOLIGRAFO GIRATORIO - SPINNER ANTIESTRES - LAPICERO FUNCIONAL ANTIANSIEDAD",
		precio: 15,
		descripcion: "Boligrafo giratorio de equilibrio antiestres y ansiedad"
	}
]


function getProductoMasSimilar(nombresArray, productosArray) {
    let maxSimilitud = 0;
    let productoMasSimilar = null;

    for (const producto of productosArray) {
        for (const nombre of nombresArray) {
            const similitud = calcularSimilitudStrings(nombre, producto.nombre);

            if (similitud > maxSimilitud) {
                maxSimilitud = similitud;
                productoMasSimilar = producto;
            }
        }
    }

    return {
        producto: productoMasSimilar,
        similitud: maxSimilitud
    };
}

// Exportar todas las funciones del módulo
module.exports = {
	productos,
	getProductoMasSimilar,
};