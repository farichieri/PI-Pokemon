import { React, useState } from 'react'
import styles from './Pagination.module.css'

function Pagination({ pokemonsPerPage, allPokemons, pagination, currentPage, setCurrentPage }) { 
    const pageNumbers = [];
    const [input, setInput] = useState(currentPage)

    const max = allPokemons / pokemonsPerPage
    
    for (let i = 1; i <= Math.ceil(max); i++) {
        pageNumbers.push(i)
    }

    function nextPage() {
        setCurrentPage(currentPage + 1);
        setInput(input - 1 );
    }

    function prevPage() {
        setCurrentPage(currentPage - 1);
        setInput(input - 1 );
    }

  return (
    <nav className={styles.paginatorContainer}> 
        <ul className={styles.paginationUlContainer}>
        <button onClick={prevPage} className={styles.prev} disabled={currentPage === 1 || currentPage < 1}>{'<'}</button>
            { pageNumbers && pageNumbers.map(number => (
                <li className={currentPage === number ? styles.activeNumber : styles.desactiveNumber} key={number} onClick={() => pagination(number)} >
                    {number}<h1>.</h1>
                </li>
            )) }
        <button onClick={nextPage} className={styles.right} disabled={currentPage === Math.ceil(max) || currentPage > Math.ceil(max)}>{'>'}</button>
        </ul> 
    </nav>
  )
}

export default Pagination