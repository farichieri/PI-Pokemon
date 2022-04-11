const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const {getAllInfo} = require("./modelRoutes/getAllInfo");
const router = Router();

router.get('/pokemons', async (req, res)  => { // FUNCIONA -> Ver por que solo devuelve unos pocos
    // El query se pasa por URL y el body se pasa para coompletar un post con info. (ej formulario)
    const { name } = req.query;  // Funciona con name /pokemons?name=pikachu
    const totalPokemons = await getAllInfo(); // Funciona con todos los pokemons + DB
    try {
        if (name) {
            const pokemonName = totalPokemons.filter(el => el.name.toLowerCase() === name.toLowerCase());
            // pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send({error: 'Pokemon not found'})
            res.status(200).send(pokemonName);
        } else { // Si no hay un query name:
            res.status(200).send(totalPokemons);
        }
    } catch(error) { 
        console.log(error)
    }
})

router.post('/pokemons', async (req, res) => {
    const { img, name, types, hp, attack, defense, speed, weight, height, createdInDb } = req.body;
    try {
        let newPokemon = await Pokemon.create({ // NO le paso types porque tengo que hacer relación aparte.
            img, name, hp, attack, defense, speed, weight, height, createdInDb
        }); 

        let typeDb = await Type.findAll({ // el Type lo tengo que encontrar en el modelo Type que tiene todas las ocupaciones.-
            where: { name: types }        // name que coincida al types que le llega por body.
        });
        newPokemon.addType(typeDb); // addType es un método de Sequelize que me trae de la tabla Type el typeDb. 
                                    // A el nuevo Pokemon, agregale el type que le pase por body.
        res.send("Pokemon created successfully!");
    } catch (error){
        console.log(error);
    } 
})

router.get('/pokemons/:idPokemon', async (req, res, next)  => { // FUNCIONA con id 
    const { idPokemon } = req.params;
    try {
        const totalPokemons = await getAllInfo(); // Me traigo TODO.-
        if (idPokemon) {
            const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == idPokemon); // Filtro al que matchea.-
            pokemonId.length ? res.status(200).send(pokemonId) : res.status(404).send("Pokemon not found");    
        }    
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/:id', (req,res) => { // Saco async
    const { id } = req.params; 
    try {
        if (id) {
            return Pokemon.destroy({ // saco await. pongo return
                where: { id: id },
            }).then(() => { // Devuelvo .then(() => con la resupuesta)
                res.send({msg: 'Pokemon deleted'}) // y saco el return obvio
            })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
