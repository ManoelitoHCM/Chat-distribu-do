// backend/chat-service/index.js
const express = require('express');
const { connect } = require('./mongo');
const { handleMessage } = require('./chatController');

const app = express();
app.use(express.json());

connect().then(() => {
  app.post('/message', handleMessage);
  app.listen(4000, () => console.log('Chat Service rodando na porta 4000'));
});