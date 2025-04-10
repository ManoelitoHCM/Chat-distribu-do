const redis = require('redis');
const client = redis.createClient({ host: 'localhost', port: 6379 });

client.on('error', (err) => console.log('Redis Client Error', err));

module.exports = client;