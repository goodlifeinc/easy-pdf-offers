let host = 'localhost';
let port = 8081;

if (process.env.ENVIRONMENT === 'heroku') {
    port = 80;
}

module.exports = {
    host,
    port
};