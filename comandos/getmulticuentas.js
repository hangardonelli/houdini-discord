const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages } = require('../config.json');
const message = require('../messageSender/msg.js');

async function obtenerMulticuentas(msg, cmd) {
  const partes = msg.content.split(' ');

  try {
    const usuario = msg.content.replace(`${partes[0]} `, '').trim();

    const resMulticuentas = await db.query(`SELECT * FROM getMulticuentas('${usuario}');`);

    if (resMulticuentas.length < 1) {
      msg.channel.send(messages.penguinNotFound);
      return false;
    }

    const multicuentasEncontradas = resMulticuentas.map(({ _nickname, _penguin_id }) => {
      return `${_nickname} (${_penguin_id})`;
    }).join("\n");

    message.embed(msg.channel, `Las multicuentas encontradas son: \n${multicuentasEncontradas}`, cmd.descripcion);

  } catch (exception) {
    console.error(exception);
    msg.channel.send(messages.badRequest);
  }
}

module.exports = { obtenerMulticuentas };
