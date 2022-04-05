import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import styles from './Details.module.css'
import Loader from '../Loader/Loader.jsx'

function Details() {
    const dispatch = useDispatch();

    const {id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id)) // props.match.params.id es para ingresar al id de ese detail.
    }, [dispatch])
    const myPokemon = useSelector((state) => state.detail);
    
  return (
    <div className={styles.detailsPage}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.backContainer}>
                    <Link to="/home"><h1 className={styles.back}>Home</h1></Link>
                </div>
            </nav>
        {
            myPokemon.length > 0 ? // Osea, ¿Tiene algo?
            <div className={styles.detailsContainer}>
                <div className={styles.details}>
                    <h2 className={styles.detailsId}>#{(myPokemon[0].id.length > 8 ? myPokemon[0].id.substring(0, 4) + "..." : myPokemon[0].id)}</h2>
                    <h1 className={styles.detailsName}>Hi! I'm {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img} alt="" width="500px" height="500px" />
                    <h2>My stats:</h2>
                    <h2>Hp: {myPokemon[0].hp}</h2>
                    <h2>Attack: {myPokemon[0].attack}</h2>
                    <h2>Defense: {myPokemon[0].defense}</h2>
                    <h2>Speed: {myPokemon[0].speed}</h2>
                    <h2>Height: {myPokemon[0].height}</h2>
                    <h2>Weight: {myPokemon[0].weigth}</h2>
                    <h2>Types: {myPokemon[0].types[0] + " " + (myPokemon[0].types[1] ? myPokemon[0].types[1] : " ")}</h2>
                    {/* <progress className={styles.hpProgress} max="100" value={myPokemon[0].hp}></progress><p>Hp: {myPokemon[0].hp}</p> */}
                </div>
            </div>
                : <Loader />
        }
    </div>
  )
}

export default Details