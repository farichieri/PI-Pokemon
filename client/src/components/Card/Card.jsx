import React from 'react'
import styles from './Card.module.css'
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

function Card({ name, img, types }) {
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
    <div className={styles.card}>
        <img className={styles.cardImg} src={img} alt="img not found" width="200px" height="200px" />
      <div className={styles.cardContainer}>
        <h3 className={styles.cardName}>{name}</h3>
        
        <div className={styles.cardTypesContainer}>
          <div className={styles.typesContainer}>
            <h5>{types[0]}</h5> 
            <img className={styles.logoTypes} src={getLogoType(types[0][0])} alt="" />
          </div>
          
          <div className={styles.typesContainer}>
            <h5>{types[1]}</h5>
            { types.length > 1 ?
            <img className={styles.logoTypes2} src={getLogoType(types[1][0])} alt=""/>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card