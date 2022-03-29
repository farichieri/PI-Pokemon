const { Router, response } = require('express');
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
        if(pokemonName.length){
            return res.status(200).send(pokemonName);
        } return res.send({error: 'Pokemon not found'})
    } else {
        try{
            return res.status(200).send(totalPokemons);
        } catch(error){
            res.send(error)
        }
    }
})

router.post('/pokemons', async (req, res)=>{
    const { img, name, type, id, hp, attack, defense, speed, weight, height, createdInDb } = req.body;
    
    try{
        const newPokemon = await Pokemon.create({
            img, name, id, hp, attack, defense, speed, weight, height, createdInDb
        });
    
        const typeDb = await Type.findAll({
            where: {
                name: type
            }
        });
        await newPokemon.addType(typeDb);
        res.send(newPokemon);
    } catch (error){
        res.send(error);
    }
})

router.get('/pokemons/:idPokemon', async(req, res, next)  => { // FUNCIONA con id
    const { idPokemon } = req.params;
    const totalPokemons = await getAllInfo();
    if(idPokemon){
        const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == idPokemon);
        if(pokemonId.length){
            try{
                return res.status(200).send(pokemonId)
            } catch(error){
                res.send(error)
            }
        }
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
