import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons, cleanPokemons } from '../../actions'
import styles from './SearchBar.module.css'

function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(cleanPokemons());
        dispatch(getNamePokemons(name));
        setName('');
    }

  return (
    <div className={styles.searchBarContainer}>
        <input className={styles.searchBarInput} value={name} type='text' placeholder='Search Pokemon...' onChange={(e) => handleInputChange(e)} />
        <button id="btnSearch" className={styles.searchBarButton} type='submit' onClick={(e) => handleSubmit(e)} disabled={name === "" ? true : false}>Search</button>
    </div>
  )
}

export default SearchBar