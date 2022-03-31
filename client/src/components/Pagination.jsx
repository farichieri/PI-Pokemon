import React from 'react'

function Pagination({ pokemonsPerPage, allPokemons, pagination }) { // Renderizamos los numeritos del pagination
    const pageNumbers = [];
    
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

  return (
    <nav>
        <ul className='pagination'>
            { pageNumbers && pageNumbers.map(number => (
                <li className='number' key={number}>
                    <a onClick={() => pagination(number)}>{number}</a>
                </li>
            )) }
        </ul>
    </nav>
  )
}

export default Pagination