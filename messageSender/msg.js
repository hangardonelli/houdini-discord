const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')


async function embed(channel, message, title = null){
   

        
        const embed = new MessageEmbed()
        .setColor(configuration.color)
        .setTitle(title == null ? configuration.name : `${title} - ${configuration.name}`)
        .setDescription(message)
      
        .setTimestamp()
    
    channel.send({ embeds: [embed] });
    
 
}

module.exports = { embed };


