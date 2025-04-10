// backend/notification-service/index.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { watchMessages } = require('./mongo');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Inicia a escuta das mensagens
watchMessages(io);

httpServer.listen(5000, () => {
  console.log('Notification Service rodando na porta 5000');
});