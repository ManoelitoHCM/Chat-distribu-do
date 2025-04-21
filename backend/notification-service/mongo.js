// backend/notification-service/mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // IPv4 explícito
const client = new MongoClient(uri);

async function pollMessages(io) {
  try {
    await client.connect();
    const db = client.db('chatDB');
    const collection = db.collection('messages');

    let lastMessageDate = new Date(0); // Data inicial (epoch)

    setInterval(async () => {
      try {
        // Busca mensagens mais recentes que a última data registrada
        const newMessages = await collection.find({
          timestamp: { $gt: lastMessageDate }
        }).sort({ timestamp: 1 }).toArray();

        if (newMessages.length > 0) {
          // Envia cada nova mensagem via WebSocket
          newMessages.forEach(msg => {
            io.emit('new-message', msg);
            console.log('Nova mensagem enviada:', msg.text); // Log para debug
          });

          // Atualiza a data da última mensagem processada
          lastMessageDate = newMessages[newMessages.length - 1].timestamp;
        }
      } catch (err) {
        console.error('Erro durante o polling:', err);
      }
    }, 1000); // Verifica a cada 1 segundo
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

module.exports = { pollMessages }; // Exporta a função de polling