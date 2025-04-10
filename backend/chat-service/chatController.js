// backend/chat-service/chatController.js
const { getDb } = require('./mongo');

async function handleMessage(req, res) {
  const { message, user } = req.body;
  const db = getDb();

  try {
    await db.collection('messages').insertOne({
      text: message,
      user,
      timestamp: new Date()
    });
    res.status(200).send('Mensagem salva no MongoDB');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar mensagem');
  }
}

module.exports = { handleMessage };