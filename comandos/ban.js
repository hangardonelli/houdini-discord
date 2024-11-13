const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages, prefix, name } = require('../config.json');

async function ban(msg, cmd) {
  try {
    const partes = msg.content.split('|');

    if (partes.length !== 3) {
      msg.channel.send(messages.badRequest);
      return false;
    }

    const username = partes[0].replace(`${prefix}cpban `, '').trim();
    const hours = partes[1];
    const banMessage = partes[2];

    const res = await db.fullQuery(`
      INSERT INTO ban(penguin_id, issued, expires, moderator_id, reason, comment, message)
      SELECT p.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '${hours} hour', 1, 2, 
      '${messages.banDBMessage.replace('{MODERATOR}', msg.author.username).replace('{BOTNAME}', name)}', 
      '${banMessage}' 
      FROM penguin p WHERE username = lower('${username}')
    `);

    if (res.rowCount > 0) {
      msg.channel.send(messages.ok);
    } else {
      msg.channel.send(messages.penguinNotFound);
    }
  } catch (exception) {
    msg.channel.send(messages.badRequest);
  }
}

module.exports = { ban };
