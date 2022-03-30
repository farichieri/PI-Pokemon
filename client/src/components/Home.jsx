import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';

function Home() {
    const dispatch = useDispatch() // Para usar la constante e ir dispatchando mis acciones. 
    const allPokemons = useSelector ((state) => state.pokemons) // Esto se hace con hooks. Con useSelector traeme en esa constante, 
                                            // todo lo que está en el estado de pokemons. Ahorra el map, state, to props
    // Ahora tratamos de traernos del estado los pokemons cuando el componente se monta:
    useEffect (() => {
        dispatch(getPokemons()) // Este dispatch es lo mismo que hacer el map dispatch to props
    }, [dispatch]) // Lo que se incluye en el arreglo, es de lo que depende el component didMount (useEffect)

    function handleClick(e) { // Siempre hay que crear los handles de las cosas que usemos abajo
        e.preventDefault(); // preventDefault es para que no se recargue la página y no se me rompan las cosas. (Porque al recargar los estados de redux, vuelven a cargarse si tenemos useEffect )
        dispatch(getPokemons()) // Resetea los pokemons
    }

    return (
        <div>
            <Link to="/pokemons">Create Pokemon</Link>
            <h1>Dale dale Pokemon!</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los Pokemons
            </button>
            <div>
                <select>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select>
                    <option value='more_attack'>More attack</option>
                    <option value='less_attack'>Less attack</option>
                </select>
                <select>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                </select>
    {
        allPokemons && allPokemons.map((el) => {
            return (
                <fragment>
                    <Link to={'/home/' + el.id}>
                        <Card name={el.name} img={el.img} types={el.types} />
                    </Link>
                </fragment>
            );
        })
    }
            </div>
        </div>
    )
}

export default Home;

