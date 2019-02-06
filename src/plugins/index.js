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
      fileReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ ops: '*' }],
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson',
          args: [
            null,
            { separator: ',' },
          ],
        }, {
          module: 'rotating-file-stream',
          args: [
            'ops_log',
            {
              size: '10MB',
              path: './logs',
            },
          ],
        },
      ],

      errorsFileReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ error: '*' }],
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson',
          args: [
            null,
            { separator: ',' },
          ],
        }, {
          module: 'rotating-file-stream',
          args: [
            'ops_error_log',
            {
              size: '10MB',
              path: './logs',
            },
          ],
        },
      ],

      consoleReporter: [
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
