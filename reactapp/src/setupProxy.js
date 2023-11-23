const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/Home',
        createProxyMiddleware({
            target: 'https://localhost:7014',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/home': '',
            },
        })
    );
};
