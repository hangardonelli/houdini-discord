const { test } = require('./comandos/test');
const { obtenerPlaycard } = require('./comandos/playcard.js');
const { addCoins } = require('./comandos/addcoins.js');
const { ban } = require('./comandos/ban.js');
const { addItem } = require('./comandos/addItems.js');
const { addFurniture } = require('./comandos/addfurniture');
const { obtenerMulticuentas } = require('./comandos/getmulticuentas');
const { obtenerItem } = require('./comandos/getitem');
const { howMany } = require('./comandos/howmany');
const { getOnlinePlayers } = require ('./comandos/getonlineplayers.js');
const { obtenerAyuda } = require('./comandos/help.js');

const { name, roles } = require('./config.json');


const comandos = [
    {
        id: 1,
        nombre: 'test',
        descripcion: 'Test de servicios',
        accion: test,
        uso: "Prueba si el bot está encendido",
        sintaxis: ""
    },
    {
        id: 2,
        nombre: 'playcard',
        descripcion: 'Obtener playcard',
        accion: obtenerPlaycard,
        roles: [],
        uso: "Obtiene la playcard de un pingüino. Esto incluye su e-mail, id, nombre en el juego, fecha de registro, monedas y nro de amigos",
        sintaxis: "<nombre del pingüino>",
    },
    {
        id: 3,
        nombre: 'ac',
        descripcion: 'Añadir monedas',
        accion: addCoins,
        uso: "Añade una cantidad de monedas a un pingüino especificado",
        sintaxis: "<número de monedas> <nombre del pingüino>",

    },
    {
        id: 4,
        nombre: 'cpban',
        descripcion: 'Banear un pingüino',
        accion: ban,
        roles: [],
        uso: "Banea a un pingüino por un número de horas especificadas y un motivo especificado",
        sintaxis: "<nombre del pingüino> | <horas> | <motivo>",
    },
    {
        id: 5,
        nombre: 'ai',
        descripcion: 'Agregar items',
        accion: addItem,
        uso: "Añade un item especifiaco a un pingüino",
        sintaxis: "<ID del item> <nombre del pingüino>",
    },
    {
        id: 6,
        nombre: 'af',
        descripcion: 'Agregar mueble',
        accion: addFurniture,
        roles: [roles.administrador],
        uso: "Agrega un mueble especificado a un pingüino",
        sintaxis: "<ID del mueble> <nombre del pingüino>",
    },
    {
        id: 7,
        nombre: 'mc',
        descripcion: 'Obtener multicuentas',
        accion: obtenerMulticuentas,
        uso: "Obtiene las multicuentas de un pingüino especificado",
        sintaxis: "<nombre del pingüino>",
    },
    {
        id: 8,
        nombre: 'gi',
        descripcion: 'Información de un item',
        accion: obtenerItem,
        uso: "Obtiene la información de un item y su entrada (si existe) de la Club Penguin Wiki",
        sintaxis: "<ID o nombre en inglés del item>",
    },
    {
        id: 9,
        nombre: 'hm',
        descripcion: 'Jugadores online',
        accion: howMany,
        uso: "Obtiene la cantidad de jugadores de un servidor",
        sintaxis: "<Nombre del servidor>"

    },
    {
        id: 10,
        nombre: "gop",
        descripcion: "Obtener jugadores online",
        uso: "Obtiene los nombres de los jugadores conectados en un servidor",
        accion: getOnlinePlayers,
        sintaxis: "<Nombre del servidor>"
    }

    
];


module.exports = { comandos }
