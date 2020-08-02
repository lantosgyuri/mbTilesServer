const { Router } = require('express');
const { getTilePNG } = require('./tilePNGController');
const routes = Router({ mergeParams: true });

routes.get('/', getTilePNG );

module.exports = routes;
