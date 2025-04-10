// backend/notification-service/mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function watchMessages(io) {
  await client.connect();
  const db = client.db('chatDB');
  const collection = db.collection('messages');

  const changeStream = collection.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const newMessage = change.fullDocument;
      io.emit('new-message', newMessage); // Envia via WebSocket
    }
  });
}

module.exports = { watchMessages };