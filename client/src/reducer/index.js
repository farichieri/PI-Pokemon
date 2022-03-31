// Genero estado incial.
const initialState = {
    pokemons : [], // Estado donde guarde los Pokemons
    isLoading : true
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return { // En mi estado pokemons, que en un principio es un arreglo vacío, 
                ...state, // manda todo lo que te mande la acción GET_POKEMONS
                pokemons: action.payload, // Guardo en un estado pokemons todos los pokemons
                isLoading: false
            }
        case 'FILTER_BY_TYPES':
            const allPokemons = state.pokemons
            const typesFilter = action.payload  === 'All' ? allPokemons : allPokemons.filter(el => el.types === action.payload) 
            // Si mi payload es All, traeme todo y sino filtramelo por el payload que me pasen (original o created)
            return {
                ...state,
                pokemons: typesFilter
            }
        // case 'FILTER_CREATED':
        //     const allPokemons = state.pokemons
        //     const createdFilter = action.payload === 'created' ? allPokemons.filter(el => el.)
        //     return {

        //     }
        default:
            return state;
    }
}

export default rootReducer;