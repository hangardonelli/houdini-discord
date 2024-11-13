const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const { color, name } = require('../config.json');

async function embed(channel, message, title = null) {
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(title ? `${title} - ${name}` : name)
    .setDescription(message)
    .setTimestamp();

  channel.send({ embeds: [embed] });
}

module.exports = { embed };
