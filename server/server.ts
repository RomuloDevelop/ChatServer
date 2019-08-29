import connectSocket from './sockets/socket';

import express = require('express');
import socketIO = require('socket.io');
import http = require('http');
import path = require('path');

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
const io = socketIO(server);
connectSocket(io);

server
  .listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  })
  .on('error', (err: Error) => {
    throw err;
  });
