const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { messages, color } = require('../config.json');
const message = require('../messageSender/msg.js');

async function obtenerItem(msg, cmd) {
  const partes = msg.content.split(' ');

  try {
    const item = msg.content.replace(`${partes[0]} `, '').trim();
    const itemInt = parseInt(item);

    let query = `SELECT i.id, i.name, i.type, i.cost FROM item i WHERE name ILIKE '%${item}%'`;
    if (itemInt) {
      query += ` OR i.id = ${itemInt}`;
    }

    const resItem = await db.query(query);

    if (resItem.length < 1) {
      msg.channel.send(messages.itemNotfound.replace("{ITEMID}", item));
      return false;
    }

    const itemData = resItem[0];
    const itemEmbed = new MessageEmbed()
      .setColor(color)
      .setTitle(`${cmd.descripcion} - ${configuration.name}`)
      .setDescription('Esta es la información del item')
      .addFields(
        { name: 'Nombre', value: itemData.name },
        { name: 'Id', value: `${itemData.id}`, inline: true },
        { name: 'Precio', value: itemData.cost === 0 ? 'Gratis' : `${itemData.cost}`, inline: true }
      )
      .setTimestamp();

    msg.channel.send(`https://clubpenguin.fandom.com/wiki/${itemData.name.split(' ').join('_')}`);
    msg.channel.send({ embeds: [itemEmbed] });

  } catch (exception) {
    console.log(exception);
    msg.channel.send(messages.badRequest);
  }
}

module.exports = { obtenerItem };
