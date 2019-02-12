module.exports = {
    routes: [
        {
            path: '/hello',
            method: 'GET|POST',
            handler: (callback) => {
                callback(200, {'welcome': 'new visitor'})
            }
        },
    ],
    notFoundHandler: (callback) => {
        callback(404);
    },
    matchRouteToHandler: function (requestInfo) {
        let handler = this.notFoundHandler;

        this.routes.forEach(function (route) {
            let methods = route.method.split('|');

            if (methods.indexOf(requestInfo.method) !== -1 && route.path === requestInfo.path) {
                handler = route.handler;
            }
        });

        return handler;
    },
};
