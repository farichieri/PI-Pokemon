const { Pokemon, Type } = require('../../db');

const getDbInfo = async () => {
    const dbPokemons = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            throught: { attributes: "" }
        }
    })
    const pokeJson = dbPokemons.map(pokemon => pokemon.toJSON());
    console.log(pokeJson);
    const pokeType = pokeJson.map(pokemon=>{
       const typeName = pokemon.types.map(type=> type.name)
       return {...pokemon, types: typeName} 
    })
    return pokeType;
}

module.exports = getDbInfo;