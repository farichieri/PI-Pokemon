import React from 'react';
import { Link } from 'react-router-dom'
// importo los hooks que voy a usar de react:
import { useState, useEffect } from 'react';
// importo los hooks de react-redux (hay que instalar antes con npm i react-redux)
import { useDispatch, useSelector } from 'react-redux';
// importo las actions que me interesa usar en este componente
import { getPokemons, filterPokemonsByTypes, filterPokemonsCreated, orderByName, orderByAttack, getTypes } from '../actions';
// Importo lso componentes que voy a usar
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';


// Siempre que voy a trabajar con algo que funcione solo en este componente (HOME), lo establezco acá. Para no perder tiempo haciendo toda esta lógica en un estado global, genero estado local en este componente. 
function Home() {
    const dispatch = useDispatch(); // Para usar la constante e ir dispatchando mis acciones. 
    const allPokemons = useSelector ((state) => state.pokemons); // Esto se hace con hooks. Con useSelector traeme en esa constante, 
                                            // todo lo que está en el estado de pokemons. Ahorra el map, state, to props
    const allPokemonsTypes = useSelector ((state) => state.types) // guardado en estado del reducer
    const [currentPage, setCurrentPage] = useState(1);  // Creamos estados locales. Uno con la página actual y otro que me setee la página actual. ponemos 1 porque arranca en la primer página.                                     
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // Cuántos pokemons quiero por página. (cuantas Cards)
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 6
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); // De más arriba.- // Slice toma una porción de un arreglo // Me dice que pokemons vamos a renderizar dependiendo de la página.-
    const [order, setOrder] = useState('')

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const load = useSelector((state) => state.isLoading);
    // Ahora tratamos de traernos del estado los pokemons cuando el componente se monta:
    useEffect (() => {
        dispatch(getPokemons()) // Este dispatch es lo mismo que hacer el map dispatch to props
        dispatch(getTypes())
    }, [dispatch]) // Lo que se incluye en el arreglo, es de lo que depende el component didMount (useEffect)

    function handleClick(e) { // Siempre hay que crear los handles de las cosas que usemos abajo
        e.preventDefault(); // preventDefault es para que no se recargue la página y no se me rompan las cosas. (Porque al recargar los estados de redux, vuelven a cargarse si tenemos useEffect )
        dispatch(getPokemons()) // Resetea los pokemons
        console.log(allPokemonsTypes)
    }

    function handleFilterTypes(e) {
        e.preventDefault();
        dispatch(filterPokemonsByTypes(e.target.value)) // e.target.value accede al valor a c/u de las opciones
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        dispatch(filterPokemonsCreated(e.target.value)) // e.target.value accede al valor a c/u de las opciones (el payload)
        e.preventDefault()
    }
    
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // Seteo la página a la 1.
        setOrder(`Ordered ${e.target.value}`) // Con este estado creado (más arriba), modificamelo para que desde el front me haga el ordenamiento.
    }

    function handleAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1); // Seteo la página a la 1.
        setOrder(`Ordered ${e.target.value}`) // Con este estado creado (más arriba), modificamelo para que desde el front me haga el ordenamiento.
    }

    return (
        <div>
            <Link to="/pokemons">Create Pokemon</Link>
            <h1>Dale dale Pokemon!</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los Pokemons
            </button>
            <div>
                <select onChange={e => handleFilterTypes(e)}>
                    <option value='all'>Types (Falta)</option>
                    {allPokemonsTypes?.map((t) => (
                          <option key={t.name} value={t.name}>{t.name}</option>
                       ))}
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                </select>
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select onChange={e => handleAttack(e)}>
                    <option value='more_attack'>+ Attack </option>
                    <option value='less_attack'>- Attack </option>
                </select>
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pagination={pagination}
                />
                
                <SearchBar />
                
                {
                load ? (<h1>Cargando bro</h1>) :
                    !allPokemons.length? (<h1>No se encontro nada capo</h1>) :
                    currentPokemons?.map((el) => {
                        return (
                            <div>
                                <Link to={'/home/' + el.id}>
                                    <Card key={el.id} name={el.name} img={el.img} types={el.types}/>
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

