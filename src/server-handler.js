const url           = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router        = require('./router');

module.exports = (request, response) => {
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
        let decoder       = new StringDecoder('utf-8');
        let buffer        = '';

        request.on('data', data => buffer += decoder.write(data));

        request.on('end', () => {
            buffer += decoder.end();

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadString);

            console.log('Request received with this payload: ', buffer);
        });
    });
};
