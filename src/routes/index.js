const pdfRoutes = require('./pdf');

const routes = [
  {
    method: 'GET',
    path: '/hello',
    handler() {
      return 'hello world';
    },
  },
].concat(pdfRoutes);

module.exports = (server) => {
  routes.forEach(r => server.route(r));
  return server;
};
