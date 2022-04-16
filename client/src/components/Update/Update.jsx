import React, { useEffect, useState  } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetail, cleanPokemons, updatePokemon, getDetail, getPokemons } from '../../actions';
import styles from './Update.module.css'
import Loader from '../Loader/Loader';

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

function Update() {
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

// const [input, setInput] = useState({
//   hp: myPokemon[0].hp,
//   attack: myPokemon[0].attack,
//   defense: myPokemon[0].defense,
//   speed: myPokemon[0].speed,
//   height: myPokemon[0].height,
//   weight: myPokemon[0].weight,
// })

const [input, setInput] = useState({
  hp: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  height: 0,
  weight: 0,
})

function handleChange(e) { 
  setInput({
      ...input,
      [e.target.name] : e.target.value
  })
}

const myPassword = "frichieri update";

function handleSubmit(e) {
  if (myPokemon[0].createdInDb) {
    dispatch(cleanPokemons());
    dispatch(cleanDetail());
    if(window.prompt('Password:') === myPassword) {
      e.preventDefault();
      dispatch(updatePokemon(id, input))
      window.alert('Pokemon updated successfully.')
      navigate(`/home/${id}`);
    } else window.alert('Password incorrect.')
      navigate(`/home/${id}`);
  } else window.alert("You can't update an original pokemon.")
}

  return (
    <div className={styles.updatePage}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.backContainer}>
                    <Link to="/home"><h1 className={styles.back} onClick={() => handleClick()}>Home</h1></Link>
                </div>
            </nav>

            {
            myPokemon.length > 0 ?
            <div className={styles.detailsContainer}>
              
                <Link to={'/home/' + id}><button className={styles.cancelUpdate}>Cancel</button></Link>
                <button className={styles.confirmUpdateButton} onClick={(e) => handleSubmit(e)}>Confirm</button>


                <h2 className={styles.detailsId}>#{(myPokemon[0].id.length > 5 ? myPokemon[0].id.substring(0, 4) + "..." : myPokemon[0].id)}</h2>
                <div className={styles.details}>
                    <h1 className={styles.detailsName}>{myPokemon[0].name}</h1>
                    <img className={styles.pokemonDetailImg} src={myPokemon[0].img} alt="" />
                    <h4>Stats:</h4>
                    <div className={styles.progressContainer}>
                        <h3>Hp:</h3><input type='range' value={input.hp} name='hp' placeholder='Hp'max="250" min="0" onChange={handleChange} autoComplete="off"/><p>{input.hp}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Attack:</h3><input type='range' value={input.attack} name='attack' max="250" min="0" onChange={handleChange} autoComplete="off"/><p>{input.attack}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Defense:</h3><input type='range' value={input.defense} name='defense' max="250" min="0" onChange={handleChange} autoComplete="off"/><p>{input.defense}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Speed:</h3><input type='range' value={input.speed} name='speed' max="250" min="0" onChange={handleChange} autoComplete="off"/><p>{input.speed}</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Height:</h3><input type='range' value={input.height} name='height' max="250" min="0" onChange={handleChange} autoComplete="off"/><p>{input.height}cms</p>
                    </div>
                    <div className={styles.progressContainer}>
                        <h3>Weight:</h3><input type='range' className={styles.weightProgress} value={input.weight} name='weight' max="250" min="0" onChange={handleChange} required/><p>{input.weight}kgs</p>
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

export default Update