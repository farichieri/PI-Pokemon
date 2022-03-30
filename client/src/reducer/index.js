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
    }
}

export default rootReducer;