export class SocketClient {
  #serverConnection = {};

  constructor({ protocol, host, port }) {
    this.protocol = protocol;
    this.host = host;
    this.port = port;
  }

  sendMessage(event, message) {
    this.#serverConnection.write(JSON.stringify({ event, message }));
  }

  async createConnection() {
    const options = {
      port: this.port,
      host: this.host,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
      },
    };

    const http = await import(this.protocol);
    const request = http.request(options);

    request.end();

    return new Promise(resolve => {
      request.once('upgrade', (request, socket) => resolve(socket));
    })
  }

  async initialize() {
    this.#serverConnection = await this.createConnection();

    console.log('I connected to the server!!');
  }
}
