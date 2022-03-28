const { Router } = require('express');
const pokemonRoute = require('./pokemons');
const typeRoute = require('./types');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Middlewares:
router.use('/pokemons', pokemonRoute); // Nos devuelve en /pokemon/* -> *=todo lo que haya adentro
router.use('/types', typeRoute);       // =^^




module.exports = router;
