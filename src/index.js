const Hapi = require('hapi');

const defineRoutes = require('./routes');
const registerPlugins = require('./plugins');

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

  /* eslint-disable class-methods-use-this */
  registerRoutes(server) {
    return defineRoutes(server);
  }

  registerPlugins(server) {
    return registerPlugins(server);
  }
  /* eslint-enable class-methods-use-this */

  async start() {
    let server = this.createServer();
    server = this.registerRoutes(server);
    server = await this.registerPlugins(server);
    try {
      server.log('info', 'Server Starting...');
      await server.start();
    } catch (err) {
      server.log('error', err);
      process.exit(1);
    }
    server.log('info', `Server running at: ${server.info.uri}`);
  }
}

module.exports = App;
