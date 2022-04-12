import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterPokemonsByTypes, filterPokemonsCreated, orderByName, orderByAttack, getTypes, cleanDetail } from '../../actions';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'
import Loader from '../Loader/Loader.jsx'
import NotFound from '../NotFound/NotFound.jsx'
import { cleanPokemons } from '../../actions';

function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons);
    const allPokemonsTypes = useSelector ((state) => state.types);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const [order, setOrder] = useState('');

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const load = useSelector((state) => state.isLoading);

    useEffect (() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        dispatch(cleanDetail());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(cleanPokemons());
        dispatch(getPokemons());
        setCurrentPage(1);
    }

    function handleFilterTypes(e) {
        e.preventDefault();
        dispatch(filterPokemonsByTypes(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        dispatch(filterPokemonsCreated(e.target.value))
        e.preventDefault();
        setCurrentPage(1);
    }
    
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleClean() {
        dispatch(cleanPokemons());
    }
    
    return (
        <div className={styles.home}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.exitContainer}>
                    <Link to="/"><i src="./exit.png" ></i><h1 className={styles.exit} onClick={handleClean}>Exit</h1></Link>
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar />
                </div>
                <div className={styles.createContainer} >
                    <Link to="/pokemons"><h1 className={styles.create} onClick={handleClean}>Create</h1></Link>
                </div>
            </nav>
            <div className={styles.filtersAndRefresh}>
                <button className={styles.filterBy}><h2>Filter by <p className={styles.flechita}>&gt;</p> </h2></button>
                <select className={styles.filter} onChange={e => handleFilterTypes(e)} value='disabled'>
                    <option value=''>Type</option>
                    <option className={styles.optionsSelect} value='all'>All Types</option>
                    {allPokemonsTypes?.map((t) => (
                          <option className={styles.optionsSelect} key={t.name} value={t.name}>{t.name}</option>
                       ))}
                </select>
                <select className={styles.filter} onChange={e => handleFilterCreated(e)} value='disabled'>
                    <option value=''>Origin</option>
                    <option className={styles.optionsSelect} value='all'>All</option>
                    <option className={styles.optionsSelect} value='api'>API</option>
                    <option className={styles.optionsSelect} value='created'>Created</option>
                </select>
                <select className={styles.filter} onChange={e => handleSort(e)} value='disabled'>
                    <option value=''>Name</option>
                    <option className={styles.optionsSelect} value='asc'>A - Z</option>
                    <option className={styles.optionsSelect} value='desc'>Z - A</option>
                </select>
                <select className={styles.filter} onChange={e => handleAttack(e)} value='disabled'>
                    <option value=''>Attack</option>
                    <option className={styles.optionsSelect} value='more_attack'>+ Attack </option>
                    <option className={styles.optionsSelect} value='less_attack'>- Attack </option>
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
                                <div key={el.id}>
                                    <Link to={'/home/' + el.id}>
                                        <Card name={el.name} img={el.img} types={el.types} />
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
                {
            load ? (<Loader />) :
                <div className={styles.pagination}>
                    { allPokemons.length >= 12 ? 
                    <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} pagination={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    : null
                    }
                </div>
            }
        </div>
    )
}

export default Home;

