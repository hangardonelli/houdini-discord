const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')
const message = require('../messageSender/msg.js');

async function obtenerItem(msg, cmd){

    let partes = msg.content.split(' ');
    try{
        
        let item = msg.content.replace(partes[0] + ' ', '');
       
        let itemInt = parseInt(item);
        let query = (`SELECT  i.id, i.name, i.type, i.cost FROM item i WHERE name ilike '%${item}%'`);
         if(itemInt){
             query = query + ` or i.id = ${itemInt};`
         }
        const resItem = await db.query(query);
        if(resItem.length < 1){
            msg.channel.send(configuration.messages.itemNotfound.replace("{ITEMID}", item));
            return false;
        }
        
     
        const itemEmbed = new MessageEmbed()
        .setColor(configuration.color)
        .setTitle(cmd.descripcion + " - " + configuration.name)
        .setDescription('Esta es la información del item')
        .addFields(
            { name: 'Nombre', value: resItem[0].name },
            { name: 'Id', value: '' + resItem[0].id, inline: true },
        )
        .addField('Precio', '' + (resItem[0].cost == 0 ? 'Gratis' : resItem[0].cost), true)
        .setTimestamp();
        msg.channel.send(`https://clubpenguin.fandom.com/wiki/${resItem[0].name.split(' ').join('_')}`);
    msg.channel.send({ embeds: [itemEmbed] });
    
    }
    catch(exception){
      console.log(exception);
        msg.channel.send(configuration.messages.badRequest);
    }
}
module.exports = { obtenerItem };