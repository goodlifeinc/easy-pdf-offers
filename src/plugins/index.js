const good = require('good');

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

  await server.register({
    plugin: good,
    options,
  });

  return server;
};
