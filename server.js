// server.js
const next = require('next');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

// With express
const express = require('express');
const port = isDev ? 3000 : 80;
app.prepare().then(() => {
  express()
    .use(handler)
    .use(cookieParser())
    .listen(port);
});
