const mineflayer = require('mineflayer');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ping = require('minecraft-server-util');
const config = require('./config.json');

// Criação do servidor web
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurações do servidor web
app.use(express.static('public')); // Arquivos estáticos em uma pasta chamada 'public'

// Variáveis para armazenar informações do bot
let bot = null;
let botInfo = {
  position: { x: 0, y: 0, z: 0 },
  health: 0,
  hunger: 0,
  gameTime: '00:00',
  chat: [],
};

// Função para criar o bot
const createBot = () => {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
 	version: config.version,
  });

  bot.on('login', () => {
    console.log(`Bot conectado como ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('Bot spawnado no mundo!');
  });

  bot.on('physicTick', () => {
    if (!bot.entity) return;
    const time = bot.time;
    const hours = Math.floor((time.timeOfDay / 1000 + 6) % 24); // Hora no jogo
    const minutes = Math.floor((time.timeOfDay % 1000) * (60 / 1000));
    botInfo = {
      position: bot.entity.position,
      health: bot.health,
      hunger: bot.food,
      gameTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      chat: botInfo.chat,
    };
    io.emit('update', botInfo); // Envia informações para o frontend
  });

// Evento: Chat global
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Evita duplicação de mensagens do bot
  console.log(`${username}: ${message}`);
  io.emit('chat', { username, message });
});

// Envio de comando ao bot
socket.on('command', (command) => {
  bot.chat(command);
  io.emit('chat', { username: 'MystickBOT', message: command, isBot: true }); // Nome do bot agora é 'MystickBOT' e com destaque
});


  bot.on('whisper', (username, message) => {
  if (username === bot.username) return;
  	console.log(`Mensagem privada de ${username}: ${message}`);
  	botInfo.chat.push(`[Privado] ${username}: ${message}`);
  	io.emit('chat', { username: `[Privado] ${username}`, message });
  });

  bot.on('end', () => {
    console.log('Bot desconectado. Tentando reconectar em 5 segundos...');
    setTimeout(checkServerAndReconnect, 5000);
  });

  bot.on('error', (err) => {
    console.log(`Erro: ${err}`);
  });
};




// Função para verificar o status do servidor
const checkServerAndReconnect = () => {
  ping.status(config.host, config.port)
    .then(() => {
      console.log('Servidor está online. Tentando reconectar...');
      createBot();
    })
    .catch(() => {
      console.log('Servidor está offline. Tentando novamente em 10 segundos...');
      setTimeout(checkServerAndReconnect, 10000);
    });
};

// Inicializar o bot
checkServerAndReconnect();

// Configuração do servidor web
server.listen(1010, () => {
  console.log('Servidor rodando no localhost:1010');
});

// Comunicação via Socket.IO
io.on('connection', (socket) => {
  console.log('Usuário conectado.');

  // Envia as informações iniciais do bot
  socket.emit('update', botInfo);

  // Recebe comandos do frontend
  socket.on('command', (command) => {
    if (bot) {
      bot.chat(command);
      botInfo.chat.push(`Bot: ${command}`);
      io.emit('chat', { username: 'Bot', message: command });
    }
  });
});
