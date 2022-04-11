import axios from 'axios';
// El redux thunk sirve para trabajar la llamadaa asíncrona.

export function getPokemons() {
    return async function(dispatch) {
        // La ruta que me cree en el back que me trae todos los Poks
        // Si no es axios.get es con fetch y hay que usar promesas con .then y con axios devuelve rta en un data.
        var json = await axios.get("/pokemons");
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

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

//Vamos a trabajar con el el search.
export function getNamePokemons(name) { // A este payload le llamamos name. (Es lo mismo)
    return async function(dispatch) {
        try {
            var json = await axios.get("/pokemons?name=" + name);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch(error) {
            console.log(error);
        }
    }
}

export function getTypes() { 
    return async function(dispatch) {
        try {
            var json = await axios.get("/types");
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            })
        } catch(error) {
            console.log(error);
        }
    }
}

export function postPokemon (payload) {
    return async function(dispatch) {
        const response = await axios.post("/pokemons", payload); // En esta ruta le hago un post del payload (el payload me llega del front) y se pone después de la ,
        return response;
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/pokemons/" + id);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function cleanDetail() {
    return {
        type: "CLEAN_DETAIL",
        payload: {}
    };
}

export function cleanPokemons() {
    return {
        type: "CLEAN_POKEMONS",
        payload: {}
    };
}

export function deletePokemon(id) {
    return async function(dispatch) {
        try {
            const json = await axios.delete("/delete/" + id)
            return dispatch({
                type: "DELETE_POKEMON",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}