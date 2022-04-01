import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';

function Details(props) {
    console.log(props);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id)) // props.match.params.id es para ingresar al id de ese detail.
    }, [dispatch])
    const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
        {
            myPokemon.length > 0 ? // Osea, ¿Tiene algo?
            <div>
                <h1>I'm {myPokemon[0].name}</h1>
                <img src={myPokemon[0].img} alt="" width="500px" height="500px" />
                <h2>Hp: {myPokemon[0].hp}</h2>
                <h2>Attack: {myPokemon[0].attack}</h2>
                <h2>Defense: {myPokemon[0].defense}</h2>
                <h2>Speed: {myPokemon[0].speed}</h2>
                <h2>Height: {myPokemon[0].height}</h2>
                <h2>Weight: {myPokemon[0].weight}</h2>
                <h2>Types: {myPokemon[0].types[0][0]} and {myPokemon[0].types[0][1]}</h2>
            </div>
            : <p>Loading...</p>
        }
        <Link to='/home'>
            <button>Back</button>
        </Link>
    </div>
  )
}

export default Details