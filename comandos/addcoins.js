const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages } = require('../config.json');

async function addCoins(msg, cmd) {
  const partes = msg.content.split(' ');

  if (partes.length < 3) return false;

  const monedas = partes[1];
  partes.splice(0, 2);
  const username = partes.join(' ').trim();

  try {
    const res = await db.fullQuery(`UPDATE penguin SET coins = coins + ${monedas} WHERE username = lower('${username}')`);

    if (res.rowCount > 0) {
      msg.channel.send(messages.ok);
    } else {
      msg.channel.send(messages.penguinNotFound);
    }
  } catch (exception) {
    msg.channel.send(messages.badRequest);
  }
}

module.exports = { addCoins };
