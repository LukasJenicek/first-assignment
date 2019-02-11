const http = require('http');
const url  = require('url');
const router = require('./router');

const port = 3000;

let server = http.createServer(function (request, response) {
    let parsedUrl = url.parse(request.url, true);
    let path      = parsedUrl.pathname;

    let requestInfo = {
        method: request.method.toUpperCase(),
        path: path.replace(/^\/+$/g, '')
    };

    let chosenHandler = router.matchRouteToHandler(requestInfo);

    chosenHandler(function (statusCode, payload) {
        payload = typeof (payload) === 'object' ? payload : {};

        let payloadString = JSON.stringify(payload);

        response.writeHead(statusCode);
        response.end(payloadString);

        console.log('Returning this response: ', statusCode, payloadString)
    });
});

server.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
});




