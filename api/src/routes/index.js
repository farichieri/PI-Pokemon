const { default: axios } = require('axios');
const { Router } = require('express');
const Pokemon = require('../models/Pokemon');
const Type = require('../models/Type');
const pokemonRoute = require('./pokemonRoutes');
const typeRoute = require('./typeRoutes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Middlewares:
 



router.use('/', pokemonRoute); // Nos devuelve en /pokemon/* -> *=todo lo que haya adentro
router.use('/', typeRoute);       // =^^



module.exports = router;
