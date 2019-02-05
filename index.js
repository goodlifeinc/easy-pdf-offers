const App = require('./src');
const config = require('./config');

const app = new App(config.host, config.port);
app.start();
