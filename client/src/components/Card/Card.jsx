import React from 'react'
import styles from './Card.module.css'
import bug from '../img/logos/bug.png'
import dark from '../img/logos/dark.png'
import dragon from '../img/logos/dragon.png'
import electric from '../img/logos/electric.png'
import fairy from '../img/logos/fairy.png'
import fighting from '../img/logos/fighting.png'
import fire from '../img/logos/fire.png'
import flying from '../img/logos/flying.png'
import ghost from '../img/logos/ghost.png'
import grass from '../img/logos/grass.png'
import ground from '../img/logos/ground.png'
import ice from '../img/logos/ice.png'
import normal from '../img/logos/normal.png'
import physics from '../img/logos/physics.png'
import poison from '../img/logos/poison.png'
import rock from '../img/logos/rock.png'
import steel from '../img/logos/steel.png'
import water from '../img/logos/water.png'

function Card( { name, img, types }) {
  function getLogoType(type) {
    console.log(type);
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
        return ice
      case 'normal':
        return normal;
      case 'physics':
        return physics;
      case 'poison':
        return poison
      case 'rock':
        return rock;
      case 'steel':
        return steel;
      case 'water':
        return water
      case undefined: 
        break
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <h3 className={styles.cardName}>{name}</h3>
        <img className={styles.cardImg} src={img} alt="img not found" width="200px" height="200px" />
        <h5 className={styles.cardTypes}>{types[0]} {types[1]}</h5> 
        <img className={styles.logoTypes} src={getLogoType(types[0][0])} />
        
        { types.length > 1 ?
        <img className={styles.logoTypes2} src={getLogoType(types[1][0])} />
          : null
        }
      </div>
    </div>
  )
}

export default Card