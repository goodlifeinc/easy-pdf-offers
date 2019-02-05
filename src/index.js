const Hapi = require('hapi');

const defineRoutes = require('./routes');

class App {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  createServer() {
    const server = Hapi.server({
      host: this.host,
      port: this.port,
    });
    return server;
  }

  registerRoutes(server) {
    return defineRoutes(server);
  }

  async start() {
    let server = this.createServer();
    server = this.registerRoutes(server);
    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
  }
}

module.exports = App;
