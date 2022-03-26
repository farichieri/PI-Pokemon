const { Router } = require('express');
const pokemonRoute = require('./pokemon');
const typeRoute = require('./type');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Middlewares:
router.use('/pokemon', pokemonRoute); // Nos devuelve en /pokemon/* -> *=todo lo que haya adentro
router.use('/type', typeRoute);       // =^^




module.exports = router;
