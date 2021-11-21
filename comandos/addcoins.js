const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')

async function addCoins(msg, cmd){
    
    let partes = msg.content.split(' ');
    if(partes < 3) return false;
    
    const monedas = partes[1];
    partes.shift();
    partes.shift();
    const username = partes.join(' ');
    
   try{
    let res = await db.fullQuery(`UPDATE penguin SET coins = coins + ${monedas} WHERE username = lower('${username}')`)
    if(res.rowCount > 0){
        msg.channel.send(configuration.messages.ok);
    }
    else{
        msg.channel.send(configuration.messages.penguinNotFound);
    }
   }
   catch(exception){
        msg.channel.send(configuration.messages.badRequest);
   }
}

module.exports = { addCoins }