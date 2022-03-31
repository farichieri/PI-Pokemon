import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import Pagination from './Pagination';

function Home() {
    const dispatch = useDispatch(); // Para usar la constante e ir dispatchando mis acciones. 
    const allPokemons = useSelector ((state) => state.pokemons); // Esto se hace con hooks. Con useSelector traeme en esa constante, 
                                            // todo lo que está en el estado de pokemons. Ahorra el map, state, to props
    const [currentPage, setCurrentPage] = useState(1);  // Creamos estados locales. Uno con la página actual y otro que me setee la página actual. ponemos 1 porque arranca en la primer página.                                     
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // Cuántos pokemons quiero por página. (cuantas Cards)
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 6
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); // De más arriba.- // Slice toma una porción de un arreglo
 
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
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
                    <option value='originals'>Originals</option>
                    <option value='created'>Created</option>
                </select>
                <Pagination 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pagination={pagination}
                />
                
    {
        currentPokemons?.map((el) => {
            return (
                <div>
                    <Link to={'/home/' + el.id}>
                        <Card name={el.name} img={el.img} types={el.types} key={el.id}/>
                    </Link>
                </div>
            );
        })
    }
            </div>
        </div>
    )
}

export default Home;

