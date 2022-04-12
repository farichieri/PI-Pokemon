const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const {getAllInfo} = require("./modelRoutes/getAllInfo");
const router = Router();

router.get('/pokemons', async (req, res)  => { 
    const { name } = req.query;
    const totalPokemons = await getAllInfo();
    try {
        if (name) {
            const pokemonName = totalPokemons.filter(el => el.name.toLowerCase() === name.toLowerCase());
            res.status(200).send(pokemonName);
        } else { 
            res.status(200).send(totalPokemons);
        }
    } catch(error) { 
        console.log(error)
    }
})

router.post('/pokemons', async (req, res) => {
    const { img, name, types, hp, attack, defense, speed, weight, height, createdInDb } = req.body;
    try {
        let newPokemon = await Pokemon.create({ 
            img, name, hp, attack, defense, speed, weight, height, createdInDb
        }); 
        let typeDb = await Type.findAll({ 
            where: { name: types }
        });
        newPokemon.addType(typeDb);
        res.send("Pokemon created successfully!");
    } catch (error){
        console.log(error);
    } 
})

router.get('/pokemons/:idPokemon', async (req, res, next)  => {
    const { idPokemon } = req.params;
    try {
        const totalPokemons = await getAllInfo();
        if (idPokemon) {
            const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == idPokemon);
            pokemonId.length ? res.status(200).send(pokemonId) : res.status(404).send("Pokemon not found");    
        }    
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/:id', async(req,res) => {
    const { id } = req.params;
    try {
        if (id) {
           await Pokemon.destroy({
                where: { id: id }
            });
            return res.send({ msg: 'Pokemon deleted' })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
