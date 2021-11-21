const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')
const message = require('../messageSender/msg.js');
const comandos  = require('../commands.js')


async function obtenerAyuda(msg, cmd){
    let partes = msg.content.split(' ');
    if(partes.length < 1){
        message.embed(msg.channel, configuration.messages.badRequest, cmd.descripcion);
    }
  
    console.log(comandos);
   const comando = comandos.comandos.find(c => c.nombre == partes[1].trim());
    

        const helpEmbed = new MessageEmbed()
        .setColor(configuration.color)
        .setTitle(cmd.descripcion + " - " + configuration.name)
        .setDescription('Esta es la ayuda del comando en cuestión')
        .addFields(
            { name: 'Nombre', value: comando.nombre },
            { name: 'Acción', value: comando.descripcion, inline: true },
            { name: 'Uso', value: comando.uso, inline: true },
            { name: 'Sintaxis', value: comando.sintaxis},
        )
        .setTimestamp()
    
    msg.channel.send({ embeds: [helpEmbed] });
    
 
}

module.exports = { obtenerAyuda };


