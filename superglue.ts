import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { handleModMessage, handleViewerMessage } from './includes/handleMessage';
import { AddressInfo } from 'net';
import { log } from './includes/logger';

// const PORT = 0;
const PORT = 63923;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
  },
});

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.text());
app.use(express.json());

const startupMessages: any[] = [];

io.on('connection', (socket) => {
  log('Incoming socket connection!');

  socket.on('message', (message) => {
    handleModMessage(io, socket, message);
  });

  startupMessages.forEach((message) => {
    handleViewerMessage(io, socket, message);
  });

  process.stdin.setEncoding;
  process.stdin.on('data', (data) => {
    handleViewerMessage(io, socket, data);
  });
});

process.stdin.on('data', (data) => {
  if (startupMessages.length < 10) {
    startupMessages.push(data);
  }
  log('stdin.on(data)', data);
});

const main = async () => {
  server.listen(PORT);
  log(`Listening on port ${(server.address() as AddressInfo).port}.`);
};

main();
