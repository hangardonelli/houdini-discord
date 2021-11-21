const db = require('../db/database.js');
const { redisClient } = require('../db/redis.js');

const message = require('../messageSender/msg.js');
const comandos  = require('../commands.js');
const configuration = require('../config.json');

async function howManyLogic(err, data, msg, cmd){
    try{
        if(err){
            throw "REDIS_EXCEPTION";
        }
        let server = configuration.servers.find(s => s.name.toLowerCase() == msg.content.split(' ')[1].toLowerCase());
        if(!server){
            message.embed(msg.channel, configuration.messages.serverNotfound.replace("{SERVERNAME}", msg.content.split(' ')[1]), cmd.descripcion)
            return false;
        }

        let worldPopulation = data[server.id];
        message.embed(msg.channel, configuration.messages.connectedPlayersCount.replace("{WORLDPLAYERCOUNT}", worldPopulation).replace("{SERVERNAME}", server.name), cmd.descripcion);
    }
    catch(exception){
        msg.channel.send(configuration.messages.badRequest);
    }
    console.log(data);
    console.log(msg.content)
}
async function howMany(msg, cmd){
    redisClient.hgetall("houdini.population", (err, data) => {
        howManyLogic(err, data, msg, cmd)
    } );
    
}

module.exports = { howMany }