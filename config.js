let host = 'localhost';
let port = 8081;

if (process.env.ENVIRONMENT === 'heroku') {
    host = 'easy-pdf-offers.herokuapp.com';
    port = 80;
}

module.exports = {
    host,
    port
};