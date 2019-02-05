const pdfRoutes = require('./pdf');

const routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, h) {
            return 'hello world';
        }
    }
].concat(pdfRoutes);

module.exports = (server) => {
    routes.forEach(r => server.route(r));
    return server;
}
