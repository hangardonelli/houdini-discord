const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages } = require('../config.json');
const message = require('../messageSender/msg.js');

async function addItem(msg, cmd) {
  try {
    const partes = msg.content.split(' ');

    if (partes.length < 3) {
      message.embed(msg.channel, messages.badRequest, cmd.descripcion);
      return false;
    }

    const itemId = partes[1];
    partes.shift();
    partes.shift();

    const username = partes.join(' ').trim();

    const resItem = await db.query(`SELECT * FROM item WHERE id = ${itemId}`);
    const resPenguin = await db.query(`SELECT * FROM penguin WHERE username = lower('${username}')`);

    if (resItem.length < 1) {
      message.embed(msg.channel, messages.itemNotfound.replace('{ITEMID}', itemId), cmd.descripcion);
      return false;
    }

    if (resPenguin.length < 1) {
      message.embed(msg.channel, messages.penguinNotFound, cmd.descripcion);
      return false;
    }

    const item = resItem[0];
    const penguin = resPenguin[0];

    const resCheckItem = await db.query(`SELECT * FROM penguin_item WHERE item_id = ${item.id} AND penguin_id = ${penguin.id}`);

    if (resCheckItem.length > 0) {
      message.embed(msg.channel, messages.itemExistsOnPlayer, cmd.descripcion);
      return false;
    }

    await db.query(`INSERT INTO penguin_item(penguin_id, item_id) VALUES (${penguin.id}, ${item.id})`);

    message.embed(msg.channel, messages.itemAdded
      .replace('{ITEMNAME}', item.name)
      .replace('{USERNAME}', username), cmd.descripcion);
  } catch (exception) {
    message.embed(msg.channel, messages.badRequest, cmd.descripcion);
  }
}

module.exports = { addItem };
