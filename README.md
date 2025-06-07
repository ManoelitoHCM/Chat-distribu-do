# 💬 Projeto: Chat em Tempo Real com WebSocket, MongoDB e Redis

Este projeto é um sistema backend de **mensagens em tempo real**, desenvolvido com **Node.js**, que integra múltiplos serviços de backend especializados e se comunica via **WebSocket (Socket.IO)**. Ele permite o envio e a persistência de mensagens em **MongoDB**, notificações via **polling**, e suporte a cache com **Redis**.

## 🧱 Arquitetura do Projeto

├── chat-service/ # Serviço que recebe e armazena mensagens no MongoDB

│ ├── index.js # Servidor HTTP do chat

│ ├── chatController.js # Lógica de inserção das mensagens

│ └── mongo.js # Conexão com MongoDB


├── gateway/ # Serviço de WebSocket para encaminhar mensagens

│ ├── index.js # Inicializa o servidor com express + socket.io

│ └── gateway.js # Escuta eventos do socket e envia requisições HTTP ao chat-service


├── notification-service/ # Serviço que faz polling no MongoDB e envia notificações por socket

│ ├── index.js # Inicializa o polling e servidor WebSocket

│ └── mongo.js # Lógica de leitura incremental das mensagens


├── redis.js # Cliente de conexão com Redis (futuramente usável para cache)

├── package.json # Dependências e scripts do projeto


## 🚀 Como Executar

> Certifique-se de que **MongoDB** e **Redis** estão rodando localmente nas portas padrão (`27017` e `6379`, respectivamente).

### 1. Instale as dependências:

```bash
npm install
```

### 2. Inicie os serviços em terminais separados:

# Terminal 1 - Chat Service
node chat-service/index.js

# Terminal 2 - Gateway WebSocket
node gateway/index.js

# Terminal 3 - Notification Service
node notification-service/index.js

