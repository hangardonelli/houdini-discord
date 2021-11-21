const db = require('../db/database.js');
const { MessageEmbed } = require('discord.js');
const configuration = require('../config.json')

async function ban(msg, cmd){
    try{
    let partes = msg.content.split('|');
    if(partes.length != 3){
        msg.channel.send(configuration.messages.badRequest);
        return false;
    }
    let username = partes[0].replace(configuration.prefix + 'cpban ', '').trim();
    let hours = partes[1];
    let message = partes[2];

   
        let res = await db.fullQuery(`INSERT INTO ban(penguin_id, issued, expires, moderator_id, reason, comment, message) SELECT p.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '${hours} hour', 1, 2, '${configuration.messages.banDBMessage.replace('{MODERATOR}', msg.author.username).replace('{BOTNAME}', configuration.name)}', '${message}' FROM penguin p WHERE username = lower('${username}')`);
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
    


module.exports = { ban }