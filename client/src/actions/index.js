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