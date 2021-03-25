import Event from 'events';
import serverHttp from 'http';

import { constants } from './constants.js';

import { SocketServer } from './socket.js';

const eventEmitter = new Event();

function testServer() {
  const options = {
    port: 9898,
    host: 'localhost',
    headers: {
      Connection: 'Upgrade',
      Upgrade: 'websocket',
    },
  };

  const http = serverHttp;
  const request = http.request(options);
  request.end();

  request.on('upgrade', (request, socket) => {
    socket.on('data', data => {
      console.log('cliente received', data.toString());
    });

    setInterval(() => {
      socket.write('Hello!');
    }, 500);
  });
}

const port = process.env.PORT || 9898;

const socketServer = new SocketServer({ port });

const server = await socketServer.initialize(eventEmitter);

console.log('socket server is running at', server.address().port);

eventEmitter.on(constants.event.NEW_USER_CONNECTED, (socket) => {
  console.log('new connection!!', socket.id);

  socket.on('data', data => {
    console.log('server received', data.toString());

    socket.write('World!');
  });
});

testServer();