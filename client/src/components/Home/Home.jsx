import React from 'react';
import { Link } from 'react-router-dom'
// importo los hooks que voy a usar de react:
import { useState, useEffect } from 'react';
// importo los hooks de react-redux (hay que instalar antes con npm i react-redux)
import { useDispatch, useSelector } from 'react-redux';
// importo las actions que me interesa usar en este componente
import { getPokemons, filterPokemonsByTypes, filterPokemonsCreated, orderByName, orderByAttack, getTypes } from '../../actions';
// Importo lso componentes que voy a usar
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'
import Loader from '../Loader/Loader.jsx'
import NotFound from '../NotFound/NotFound.jsx'

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
        <div className={styles.home}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.exitContainer}>
                    <Link to="/"><i src="./exit.png" ></i><h1 className={styles.exit}>Exit</h1></Link>
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar />
                </div>
                <div className={styles.createContainer} >
                    <Link to="/pokemons"><h1 className={styles.create} >Create</h1></Link>
                </div>
            </nav>
            <div className={styles.filtersAndRefresh}>
                <button className={styles.filterBy}><h2>Filters <p className={styles.flechita}>&gt;</p> </h2></button>
                <select className={styles.filter} onChange={e => handleFilterTypes(e)} value='disabled'>
                    <option value=''>Types</option>
                    <option value='all'>All Types</option>
                    {allPokemonsTypes?.map((t) => (
                          <option key={t.name} value={t.name}>{t.name}</option>
                       ))}
                </select>
                <select className={styles.filter} onChange={e => handleFilterCreated(e)} value='disabled'>
                    <option value=''>Origin</option>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                </select>
                <select className={styles.filter} onChange={e => handleSort(e)} value='disabled'>
                    <option value=''>Name</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select className={styles.filter} onChange={e => handleAttack(e)} value='disabled'>
                    <option value=''>Attack</option>
                    <option value='more_attack'>+ Attack </option>
                    <option value='less_attack'>- Attack </option>
                </select>
                <button className={styles.refreshButton} onClick={e => {handleClick(e)}}>
                    <h2>Refresh All</h2>
                </button>
            </div>
                <div className={styles.cardsContainer}>
                    {
                        load ? (<Loader />) :
                        !allPokemons.length? (<NotFound />) :
                        currentPokemons?.map((el) => {
                            return (
                                <div>
                                    <Link to={'/home/' + el.id}>
                                        <Card key={el.id} name={el.name} img={el.img} types={el.types} />
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        pagination={pagination}
                    />
        </div>
    )
}

export default Home;

