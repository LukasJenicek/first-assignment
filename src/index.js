const http          = require('http');
const https         = require('https');
const fs            = require('fs');
const config        = require('./config');
const serverHandler = require('./server-handler');

const httpsServerOptions = {
    'key': fs.readFileSync('./src/https/key.pem'),
    'cert': fs.readFileSync('./src/https/cert.pem')
};

const httpServer = http.createServer((request, response) => {
    serverHandler(request, response);
});

const httpsServer = https.createServer(httpsServerOptions, (request, response) => {
    serverHandler(request, response);
});

httpServer.listen(config.httpPort, () => {
    console.log(`The http server is listening on port ${config.httpPort}`);
});

httpsServer.listen(config.httpsPort, () => {
    console.log(`The https server is listening on port ${config.httpsPort}`);
});
