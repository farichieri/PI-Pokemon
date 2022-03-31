// Genero estado incial.
const initialState = {
    pokemons : [] // Estado donde guarde los Pokemons
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return { // En mi estado pokemons, que en un principio es un arreglo vacío, 
                ...state, // manda todo lo que te mande la acción GET_POKEMONS
                pokemons: action.payload
            }
        // case 'FILTER_BY_STATE':
        //     const allPokemons = state.pokemons
        //     const attackFilter = action.payload  === 'All' ? allPokemons : allPokemons.filter(el => el.status === action.payload) 
        //     // Si mi payload es All, traeme todo y sino filtramelo por el payload que me pasen (original o created)
        //     return {

        //     }
        default:
            return state;
    }
}

export default rootReducer;