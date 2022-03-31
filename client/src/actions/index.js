import axios from 'axios';
// El redux thunk sirve para trabajar la llamadaa asíncrona.

export function getPokemons() {
    return async function(dispatch) {
        // La ruta que me cree en el back que me trae todos los Poks
        // Si no es axios.get es con fetch y hay que usar promesas con .then y con axios devuelve rta en un data.
        var json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}
// function para los filtros (ver Home)
export function filterPokemonsByTypes(payload) { // El payload será el value que me va a llegar.
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}
// Ya creada la acción, hay que dejar la menor cantidad de lógica en ella.
// La acción es solamente despachar un tipo. Se recomienda hacerlo en reducer o Component.-

export function filterPokemonsCreated(payload) { // Este payload va a ser el value que fue creado.
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}