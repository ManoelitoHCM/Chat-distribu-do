const express = require('express');
const { createServer } = require('http');
const setupGateway = require('./gateway');

const app = express();
const httpServer = createServer(app);
setupGateway(httpServer);

httpServer.listen(3000, () => {
  console.log('Gateway rodando na porta 3000');
});