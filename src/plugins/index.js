const good = require('good');
const inert = require('inert');
const vision = require('vision');
const swagger = require('hapi-swagger');

module.exports = async (server) => {
  const options = {
    ops: {
      interval: 1000,
    },
    reporters: {
      myConsoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }],
        },
        {
          module: 'good-console',
          args: [{
            format: 'YYYY-MM-DD/HH:mm:ss.SSS',
            color: true,
          }],
        },
        'stdout',
      ],
    },
  };

  await server.register([
    {
      plugin: good,
      options,
    },
    inert,
    vision,
    {
      plugin: swagger,
      options: {
        info: {
          title: 'Easy Pdf Offers API Documentation',
          version: '0.0.1',
        },
      },
    },
  ]);

  return server;
};
