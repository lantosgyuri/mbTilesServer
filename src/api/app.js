const express = require('express');
const Routes = require('./modules')

const {
    configErrorHandler,
} = require('./config/middlewares');

// TODO midlewares ?
const app = express();

app.get('/', (req, res, next) => {
    const error = new Error('Use an existing route');
    res.status(404);
    next(error);
});

app.use('/api/v1/tiles/:z/:x/:y.*', Routes.tilesPNG);

configErrorHandler(app);



module.exports = app;
