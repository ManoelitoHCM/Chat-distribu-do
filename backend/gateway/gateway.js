// backend/gateway/gateway.js
const { Server } = require('socket.io');
const axios = require('axios');

module.exports = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    socket.on('send-message', async (data) => {
      try {
        await axios.post('http://localhost:4000/message', {
          message: data.text,
          user: data.user
        });
      } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
      }
    });
  });
};