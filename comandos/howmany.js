const db = require('../db/database.js');
const { redisClient } = require('../db/redis.js');
const message = require('../messageSender/msg.js');
const configuration = require('../config.json');

async function howManyLogic(err, data, msg, cmd) {
  try {
    if (err) {
      console.error(err);
      throw new Error("REDIS_EXCEPTION");
    }

    const serverName = msg.content.split(' ')[1].toLowerCase();
    const server = configuration.servers.find(s => s.name.toLowerCase() === serverName);

    if (!server) {
      message.embed(msg.channel, configuration.messages.serverNotfound.replace("{SERVERNAME}", serverName), cmd.descripcion);
      return;
    }

    const worldPopulation = data[server.id];
    const responseMessage = configuration.messages.connectedPlayersCount
      .replace("{WORLDPLAYERCOUNT}", worldPopulation)
      .replace("{SERVERNAME}", server.name);

    message.embed(msg.channel, responseMessage, cmd.descripcion);
  } catch (exception) {
    console.error(exception);
    msg.channel.send(configuration.messages.badRequest);
  }
}

async function howMany(msg, cmd) {
  redisClient.hgetall("houdini.population", (err, data) => {
    howManyLogic(err, data, msg, cmd);
  });
}

module.exports = { howMany };
