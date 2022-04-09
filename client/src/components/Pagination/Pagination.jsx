import React from 'react'
import styles from './Pagination.module.css'

function Pagination({ pokemonsPerPage, allPokemons, pagination }) { 
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

  return (
    <nav className={styles.paginatorContainer}> 
        <ul className={styles.paginationUlContainer}>
            { pageNumbers && pageNumbers.map(number => (
                <li className={styles.paginationNumber} key={number} onClick={() => pagination(number)}>
                    {number}
                </li>
            )) }
        </ul> 
    </nav>
  )
}

export default Pagination