import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';

function Home() {
    const dispatch = useDispatch() // Para usar la constante e ir dispatchando mis acciones. 
    const allPokemons = useSelector ((state) => state.pokemons) // Esto se hace con hooks. Con useSelector traeme en esa constante, 
                                            // todo lo que está en el estado de pokemons. Ahorra el map, state, to props
    // Ahora tratamos de traernos del estado los pokemons cuando el componente se monta:
    useEffect (() => {
        dispatch(getPokemons()) // Este dispatch es lo mismo que hacer el map dispatch to props
    }, [])

}

export default Home;

