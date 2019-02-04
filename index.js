var express = require( 'express' )
var bodyParser = require( 'body-parser' )
var app = express()
app.use( bodyParser.json() )

app.post( '/pdfexport', function ( req, res ) {
    console.log('go');
} )
const hostname = 'localhost';
const port = '8080';
app.listen( port, hostname, function () {
    console.log( `Export Server running at http://${hostname}:${port}` );
} )