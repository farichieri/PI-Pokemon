import React from 'react'
import styles from './Pagination.module.css'

function Pagination({ pokemonsPerPage, allPokemons, pagination }) { // Renderizamos los numeritos del pagination
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

  return ( // Acá renderizamos el nav de los números de páginas.-
    <nav className={styles.paginatorContainer}> 
        <ul className={styles.paginationUlContainer}>
            { pageNumbers && pageNumbers.map(number => (
                <li className={styles.paginationNumber} key={number}>
                    <a onClick={() => pagination(number)}>{number}</a>
                </li>
            )) }
        </ul>
    </nav>
  )
}

export default Pagination