const db = require('../db/database.js');
const { redisClient } = require('../db/redis.js');
const message = require('../messageSender/msg.js');
const { messages, prefix, servers } = require('../config.json');

async function getOnlinePlayersLogic(err, data, msg, cmd) {
  try {
    if (err) {
      console.error(err);
      throw new Error("REDIS_EXCEPTION");
    }

    if (data.length === 0) {
      message.embed(msg.channel, messages.noPlayersInServer, cmd.descripcion);
      return;
    }

    const playerIds = data.join(",");
    const playersQuery = await db.query(`SELECT nickname FROM penguin WHERE id IN (${playerIds});`);

    let messageToSend = messages.connectedPlayersMessage;

    playersQuery.forEach(player => {
      messageToSend += `\n${player.nickname}`;
    });

    message.embed(msg.channel, messageToSend, cmd.descripcion);
  } catch (exception) {
    console.error(exception);
    msg.channel.send(messages.badRequest);
  }
}

async function getOnlinePlayers(msg, cmd) {
  const serverName = msg.content.replace(`${prefix + cmd.nombre} `, "").toLowerCase();
  const server = servers.find(s => s.name.toLowerCase() === serverName);

  if (!server) {
    message.embed(msg.channel, messages.serverNotfound.replace("{SERVERNAME}", serverName));
    return;
  }

  redisClient.smembers(`houdini.players.${server.id}`, (err, data) => {
    getOnlinePlayersLogic(err, data, msg, cmd);
  });
}

module.exports = { getOnlinePlayers };
