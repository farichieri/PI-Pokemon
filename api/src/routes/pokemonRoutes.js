const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const {getAllInfo} = require("./modelRoutes/getAllInfo");
const router = Router();

router.get('/pokemons', async(req, res, next)  => { // FUNCIONA -> Ver por que solo devuelve unos pocos
    // Aca combinamos la información de la api y la info de mi base de datos en una sola request.
    // Para obtener los personajes del link que nos dan de pokemons, vamos a usar Axios:
    // Es una libreria que funciona con fetch.
    const {name} = req.query; 
    const totalPokemons = await getAllInfo();
    if (name){
        const pokemonName = totalPokemons.filter(ele=>ele.name.toLowerCase().includes(name.toLowerCase()))
        if (pokemonName.length) {
            return res.status(200).send(pokemonName);
        } return res.send({error: 'Pokemon not found'})
    } else {
        try {
            return res.status(200).send(totalPokemons);
        } catch(error){
            res.send(error)
        }
    }
})

router.post('/pokemons', async (req, res)=>{
    const {
       img, name, types, hp, attack, defense, speed, weight, height } = req.body;
    try {
        let newPokemon = await Pokemon.create({
            img, name, hp, attack, defense, speed, weight, height
        });

        let typeDb = await Type.findAll({
            where: { name: types }
        });

        newPokemon.addType(typeDb);
        res.send(newPokemon);
    } catch (error){
        res.send(error);
    }
})

router.get('/pokemons/:idPokemon', async(req, res, next)  => { // FUNCIONA con id y con name /pokemons?name=pikachu
    const { idPokemon } = req.params;
    const totalPokemons = await getAllInfo();
    if (idPokemon) {
        const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == idPokemon);
        if (pokemonId.length) {
            try{
                return res.status(200).send(pokemonId)
            } catch(error){
                res.send(error)
            }
        }
    }
})

module.exports = router;
