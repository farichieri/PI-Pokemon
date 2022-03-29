const { Router } = require('express');
const pokemonRoute = require('./pokemonRoutes');
const typeRoute = require('./typeRoutes');

const router = Router();

router.use('/', pokemonRoute); // Nos devuelve en /pokemon/* -> *=todo lo que haya adentro
router.use('/', typeRoute);       // =^^

module.exports = router;
