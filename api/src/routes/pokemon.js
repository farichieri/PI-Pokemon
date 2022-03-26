const { Router, application } = require('express');
const { Pokemon } = require('../db')
const router = Router();

router.get('/', (req, res, next)  => {
    return Pokemon.findAll()
    .then((pokemon) => {
        res.send(pokemon)
    })
    .catch((error) => {
        next(error)
    })
})

router.post('/', async (req, res, next)  => {
    try {
        const { name } = req.body;
        const newPokemon = await Pokemon.create({
            name
        });
        res.status(201).send(newPokemon);
    } catch (error) {
        next(error);
    }
})

// router.post('/pokemonId/type/:typeId', (req, res, next) => {
//     try {
//         const { pokemonId, typeId } = req.params;
//         const pokemon = await Pokemon.findByPk(pokemonId);
//         await pokemon.addType(typeId);
//         res.send(200)
//     } catch (error) {
//         next(error);
//     }
// })

router.put('/', (req, res, next)  => {
    res.send('soy put /pokemon')
})

router.delete('/', (req, res, next)  => {
    res.send('soy delete /pokemon')
})


module.exports = router;
