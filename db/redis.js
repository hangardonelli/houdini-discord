const configuration = require('../config.json');
const redis = require("redis");
const redisClient = redis.createClient(configuration.redis.port, configuration.redis.host);

module.exports = { redisClient };