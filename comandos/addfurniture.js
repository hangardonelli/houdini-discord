const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages } = require('../config.json');
const message = require('../messageSender/msg.js');

async function addFurniture(msg, cmd) {
  try {
    const partes = msg.content.split(' ');

    if (partes.length < 3) {
      message.embed(msg.channel, messages.badRequest, cmd.descripcion);
      return false;
    }

    const itemId = partes[1];
    partes.splice(0, 2);
    const username = partes.join(' ').trim();

    const [resItem] = await db.query(`SELECT * FROM furniture WHERE id = ${itemId}`);
    const [resPenguin] = await db.query(`SELECT * FROM penguin WHERE username = lower('${username}')`);

    if (!resItem) {
      message.embed(msg.channel, messages.itemNotfound.replace('{ITEMID}', itemId), cmd.descripcion);
      return false;
    }

    if (!resPenguin) {
      message.embed(msg.channel, messages.penguinNotFound, cmd.descripcion);
      return false;
    }

    const resCheckItem = await db.query(`SELECT * FROM penguin_furniture WHERE furniture_id = ${resItem.id} AND penguin_id = ${resPenguin.id}`);

    if (resCheckItem.length > 0) {
      await db.query(`UPDATE penguin_furniture SET quantity = quantity + 1 WHERE penguin_id = ${resPenguin.id} AND furniture_id = ${resItem.id}`);
    } else {
      await db.query(`INSERT INTO penguin_furniture(penguin_id, furniture_id, quantity) VALUES (${resPenguin.id}, ${resItem.id}, 1)`);
    }

    message.embed(msg.channel, messages.itemAdded
      .replace('{ITEMNAME}', resItem.name)
      .replace('{USERNAME}', username), cmd.descripcion);
  } catch (exception) {
    message.embed(msg.channel, messages.badRequest, cmd.descripcion);
  }
}

module.exports = { addFurniture };
