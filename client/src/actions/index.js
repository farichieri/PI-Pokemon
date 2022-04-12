import axios from 'axios';

export function getPokemons() {
    return async function(dispatch) {
        var json = await axios.get("/pokemons");
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function filterPokemonsByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}

export function filterPokemonsCreated(payload) {
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

export function getNamePokemons(name) {
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
        const response = await axios.post("/pokemons", payload);
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