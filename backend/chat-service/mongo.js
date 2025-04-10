// backend/chat-service/mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db('chatDB');
    console.log('Conectado ao MongoDB!');
    return db;
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };