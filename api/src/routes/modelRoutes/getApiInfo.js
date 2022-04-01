const axios = require('axios');
// Función que me trae la información de la API:
const getApiInfo = async () => { // se instala e importa AXIOS para poder usarla. (Si se usa fetch no es necesario)
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon') // Se usa AWAIT porque uno nunca sabe cuanto va a demorar la respuesta, entonces le aviso que tienen que esperar a la respuesta antes de cargar la información a la variable apiUrl (de manera asíncrona).-
    const apiUrlRest = await axios.get(apiUrl.data.next);
    const allPokemons = apiUrl.data.results.concat(apiUrlRest.data.results) // ¿.RESULTS?
                        // Agarra nombres y url de pokemons // Agarra el resto 
    
    const apiInfo = await Promise.all (
        allPokemons.map(async el => {
            const pokemon = await axios.get(el.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weigth: pokemon.data.weight,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map( pokeTypes => [pokeTypes.type.name])
            }
        })
    )
    return apiInfo;
}

module.exports = getApiInfo;