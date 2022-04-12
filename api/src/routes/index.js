const { Router } = require('express');
const pokemonRoute = require('./pokemonRoutes');
const typeRoute = require('./typeRoutes');

const router = Router();

router.use('/', pokemonRoute);
router.use('/', typeRoute);

module.exports = router;
