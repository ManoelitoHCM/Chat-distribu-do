// backend/notification-service/notificationHandler.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

MongoClient.connect(uri, (err, client) => {
  const db = client.db('chatDB');
  const collection = db.collection('messages');
  const changeStream = collection.watch();

  changeStream.on('change', (change) => {
    io.emit('new-message', change.fullDocument.text); // Envia via WebSocket
  });
});