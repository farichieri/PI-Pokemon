const { Pokemon, Type } = require('../../db');

const getDbInfo = async () => {
    const dbPokemons = await Pokemon.findAll({
        include: { // Traeme el modelo Type mediante el nombre. Osea el pokemon y su type
            model: Type,
            attributes: ['name'],
            through: { attributes: [] }
        }
    })
    
    const pokeJson = dbPokemons.map(pokemon => pokemon.toJSON());
    const pokeType = pokeJson.map(pokemon=>{
       const typeName = pokemon.types.map(type=> [type.name])
       return {...pokemon, types: typeName} 
    })
    return pokeType;
}

module.exports = getDbInfo;