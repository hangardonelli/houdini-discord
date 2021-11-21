const db = require('../db/database.js');
const { redisClient } = require('../db/redis.js');
const message = require('../messageSender/msg.js');
const configuration = require('../config.json');

async function getOnlinePlayersLogic(err, data, msg, cmd){
    try{
        if(err){ 
            console.log(err);
            throw "REDIS_EXCEPTION";
        }
        if(data.length == 0){
            message.embed(msg.channel, configuration.messages.noPlayersInServer, cmd.descripcion);
            return;
        }
        let q = await db.query(`SELECT nickname FROM penguin WHERE id in (${data.join(",")});`);
        
        let messageToSend = configuration.messages.connectedPlayersMessage;

        for(let i = 0; i < q.length; i++){
            messageToSend = messageToSend + "\n" + q[i].nickname;
        }

        message.embed(msg.channel, messageToSend, cmd.descripcion);

    }
    catch(exception){
        msg.channel.send(configuration.messages.badRequest);
    }
}
async function getOnlinePlayers(msg, cmd){
    let command = `${configuration.prefix + cmd.nombre} `;
    

    let server = configuration.servers.find(s => s.name.toLowerCase() == msg.content.replace(command, "").toLowerCase());
    if(!server){
        message.embed(msg.channel, configuration.messages.serverNotfound.replace("{SERVERNAME}", msg.content.replace(command, "").toLowerCase()));
        return;
    }
    redisClient.smembers(`houdini.players.${server.id}`, (err, data) => {
        getOnlinePlayersLogic(err, data, msg, cmd)
    } );
    
}

module.exports = { getOnlinePlayers }