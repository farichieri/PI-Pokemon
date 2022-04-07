import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import styles from './Details.module.css'
import Loader from '../Loader/Loader.jsx'
import { cleanDetail } from '../../actions';

function Details() {
    const dispatch = useDispatch();

    const {id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id)) // props.match.params.id es para ingresar al id de ese detail.
    }, [dispatch])
    const myPokemon = useSelector((state) => state.detail);
    
    function handleClick(e) {
        dispatch(cleanDetail())
    }

  return (
    <div className={styles.detailsPage}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.backContainer}>
                    <Link to="/home"><h1 className={styles.back} onClick={() => handleClick()}>Home</h1></Link>
                </div>
            </nav>
        {
            myPokemon.length > 0 ? // Osea, ¿Tiene algo?
            <div className={styles.detailsContainer}>
                <div className={styles.details}>
                    <h2 className={styles.detailsId}>#{(myPokemon[0].id.length > 8 ? myPokemon[0].id.substring(0, 4) + "..." : myPokemon[0].id)}</h2>
                    <h1 className={styles.detailsName}>{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img} alt="" width="500px" height="500px" />
                    <h4>Stats:</h4>
                    <div className={styles.progressContainer}>
                        <h3>Hp:</h3><progress className={styles.hpProgress} max="250" value={myPokemon[0].hp}></progress><p>{myPokemon[0].hp}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Attack:</h3><progress className={styles.attackProgress} max="250" value={myPokemon[0].attack}></progress><p>{myPokemon[0].attack}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Defense:</h3><progress className={styles.defenseProgress} max="250" value={myPokemon[0].defense}></progress><p>{myPokemon[0].defense}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Speed:</h3><progress className={styles.speedProgress} max="250" value={myPokemon[0].speed}></progress><p>{myPokemon[0].speed}</p>
                    </div>
                        <div className={styles.progressContainer}>
                    <h3>Height:</h3><progress className={styles.heightProgress} max="250" value={myPokemon[0].height}></progress><p>{myPokemon[0].height}cms</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Weight:</h3><progress className={styles.weightProgress} max="250" value={myPokemon[0].weight}></progress><p>{myPokemon[0].weight}kgs</p>
                    </div>
                    <div className={styles.typesContainer}>
                        <h2>Types: {myPokemon[0].types[0] + " " + (myPokemon[0].types[1] ? myPokemon[0].types[1] : " ")}</h2>
                    </div>
                </div>
            </div>
                : <Loader />
        }
    </div>
  )
}

export default Details