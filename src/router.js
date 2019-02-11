module.exports = {
    routes: [
        {
            path: '/hello',
            method: 'GET',
            handler: function (callback) {
                callback(200, {'hello': 'world'})
            }
        }
    ],
    notFoundHandler: function (callback) {
        callback(404);
    },
    matchRouteToHandler: function (requestInfo) {
        let handler = this.notFoundHandler;

        this.routes.forEach(function (route) {
            if (route.method === requestInfo.method && route.path === requestInfo.path) {
                handler = route.handler;
            }
        });

        return handler;
    },
};
