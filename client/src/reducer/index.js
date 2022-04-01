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
        // case 'FILTER_BY_TYPES':
        //     const allPokemons = state.allPokemons
        //     const typesFilter = action.payload  === 'All' ? allPokemons : allPokemons.filter(el => el.types === action.payload) 
        //     // Si mi payload es All, traeme todo y sino filtramelo por el payload que me pasen (original o created)
        //     return {
        //         ...state,
        //         pokemons: typesFilter
        //     }
        case 'FILTER_CREATED':
            const allPokemons2 = state.pokemons;
            const createdFilter = action.payload === 'created' ? allPokemons2.filter(el => el.createdInDb) : allPokemons2.filter( el => !el.createdInDb)
            console.log(state)
            return {
                ...state,
                pokemons: action.payload === 'all' ? allPokemons2 : createdFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' 
            ? state.pokemons.sort(function(a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            }) : state.pokemons.sort(function(a, b) { // 'desc'
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            })
            return {
                ...state,
                pokemons: sortedArr
            }
        case 'ORDER_BY_ATTACK':
            let sortedAttack = action.payload === 'less_attack'
            ? state.pokemons.sort(function(a, b) {
                if (a.attack > b.attack) return 1;
                if (b.attack > a.attack) return -1;
                return 0;
            }) : state.pokemons.sort(function(a, b) { // 'less_attack'
                if (a.attack > b.attack) return -1;
                if (b.attack > a.attack) return 1;
                return 0;
            })
            return {
                ...state,
                pokemons: sortedAttack
            }
        default:
            return state;
    }
}

export default rootReducer;