import { React, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, cleanDetail, cleanPokemons, deletePokemon } from '../../actions';
import styles from './Details.module.css'
import Loader from '../Loader/Loader.jsx'

import bug from '../../images/logos/bug.png'
import dark from '../../images/logos/dark.png'
import dragon from '../../images/logos/dragon.png'
import electric from '../../images/logos/electric.png'
import fairy from '../../images/logos/fairy.png'
import fighting from '../../images/logos/fighting.png'
import fire from '../../images/logos/fire.png'
import flying from '../../images/logos/flying.png'
import ghost from '../../images/logos/ghost.png'
import grass from '../../images/logos/grass.png'
import ground from '../../images/logos/ground.png'
import ice from '../../images/logos/ice.png'
import normal from '../../images/logos/normal.png'
import psychic from '../../images/logos/psychic.png'
import poison from '../../images/logos/poison.png'
import rock from '../../images/logos/rock.png'
import steel from '../../images/logos/steel.png'
import water from '../../images/logos/water.png'
import unknown from '../../images/logos/unknown.png'
import shadow from '../../images/logos/shadow.jpg'

function Details() {
    const myPokemon = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    
    function handleClick() {
        dispatch(cleanDetail());
        dispatch(cleanPokemons());
    }

    const myPassword = "frichieri delete"

    function handleDelete() {
      if (myPokemon[0].createdInDb) {
        const confirm = window.confirm('Are you sure?');
          if (confirm) {
            if(window.prompt('Password:') === myPassword) {
              dispatch(deletePokemon(id));
              dispatch(cleanDetail());
              dispatch(cleanPokemons());
              alert('Pokemon deleted');
              navigate('/home')
          }
          else alert("Password incorrect.")
        }
      }
      else alert("You can't delete an original pokemon.")
    }

    function handleUpdate() {
      if (myPokemon[0].createdInDb) {
        navigate("/update/" + id)
      }
      else window.alert("You can't update an original pokemon")
    }

    function getLogoType(type) {
        switch(type) {
          case 'bug':
            return bug;
          case 'dark':
            return dark;
          case 'dragon':
            return dragon
          case 'electric':
            return electric;
          case 'fairy':
            return fairy;
          case 'fighting':
            return fighting
          case 'fire':
            return fire;
          case 'flying':
            return flying;
          case 'ghost':
            return ghost
          case 'grass':
            return grass;
          case 'ground':
            return ground;
          case 'ice':
            return ice;
          case 'normal':
            return normal;
          case 'psychic':
            return psychic;
          case 'poison':
            return poison
          case 'rock':
            return rock;
          case 'steel':
            return steel;
          case 'water':
            return water
          case 'shadow':
            return shadow;
          case 'unknown':
            return unknown;
          default: 
            break
        }
      }
      
  return (
    <div className={styles.detailsPage}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.backContainer}>
                    <Link to="/home"><h1 className={styles.back} onClick={() => handleClick()}>Home</h1></Link>
                </div>
            </nav>
        {
            myPokemon.length > 0 ?
            <div className={styles.detailsContainer}>
              <button className={styles.pokemonDelete} onClick={() => handleDelete()}>Delete</button>
              
                <button onClick={() => handleUpdate()} className={styles.updateButton}>Update</button>


                <h2 className={styles.detailsId}>#{(myPokemon[0].id.length > 5 ? myPokemon[0].id.substring(0, 4) + "..." : myPokemon[0].id)}</h2>
                <div className={styles.details}>
                    <h1 className={styles.detailsName}>{myPokemon[0].name}</h1>
                    <img className={styles.pokemonDetailImg} src={myPokemon[0].img} alt="" />
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
                    <div className={styles.superTypesContainer}>
                        <div className={styles.typesContainer}>
                            <h5>{myPokemon[0].types[0]}</h5> 
                            <img className={styles.logoTypes} src={getLogoType(myPokemon[0].types[0][0])} alt="" />
                        </div>
                        <div className={styles.typesContainer}>
                            <h5>{myPokemon[0].types[1]}</h5>
                            { myPokemon[0].types[1] ?
                            <img className={styles.logoTypes2} src={getLogoType(myPokemon[0].types[1][0])} alt="" />
                            : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            : <Loader />
        }
    </div>
  )
}

export default Details