const { Router, response } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', (req, res, next)  => {
    // Aca combinamos la información de la api y la info de mi base de datos en una sola request.
    // Para obtener los personajes del link que nos dan de pokemons, vamos a usar Axios:
    // Es una libreria que funciona con fetch.
    let pokemonPromiseApi = axios.get('https://pokeapi.co/api/v2/pokemon/') // axios.get devuelve una promesa. // No es necesario hacerle .json y devolver otra promesa. Lo hace todo de una vez y devuelve todo en .data (+ práctico).-
    let pokemonPromiseDb = Pokemon.findAll({ // esto es otra promesa.
        include: Type
    })
    Promise.all([
        pokemonPromiseApi, // respuesta de la API
        pokemonPromiseDb   // respuesta de mi base de datos
    ])
    .then((answer) => {
        const [pokemonApi, pokemonDb] = answer;
        let filteredPokemonsApi = pokemonApi.data.results.map((pokemon) => {
            return {    // saco los valores que no quiero enviar
                id: pokemon.id,
                name: pokemon.name
            }
        })
        let allPokemons = [...filteredPokemonsApi, ...pokemonDb] // concateno
        res.send(allPokemons);
    })
})

// router.get('/', (req, res, next)  => {
//     return Pokemon.findAll({
//         include: Type
//     })
//     .then((pokemon) => {
//         res.send(pokemon)
//     })
//     .catch((error) => {
//         next(error)
//     })
// })

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

router.get('/:idPokemon', async(req, res, next)  => {
    try {
        const idPokemon = req.params.id;
        let pokemon
        if (typeof idPokemon === 'string' && idPokemon.length > 8) {
            // es mio
            pokemon = await Pokemon.findByPk(idPokemon);
            res.send(pokemon);
        } else {
            // es de la api
           response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + idPokemon);
           pokemon = response.data
        }
        res.send(pokemon);
    } catch (error) {
        next(error)
    }
})

router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
    try {
        const { pokemonId, typeId } = req.params;
        const pokemon = await Pokemon.findByPk(pokemonId);
        await pokemon.addType(typeId);
        res.send(200);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
