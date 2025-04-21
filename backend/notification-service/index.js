// backend/notification-service/index.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { pollMessages } = require('./mongo'); // Importa a função de polling

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Inicia o polling de mensagens
pollMessages(io);

httpServer.listen(5000, () => {
  console.log('Notification Service rodando na porta 5000 (com polling)');
});