import React from 'react'
import styles from './Card.module.css'

function Card( { name, img, types }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <h3 className={styles.cardName}>{name}</h3>
        <img className={styles.cardImg} src={img} alt="img not found" width="200px" height="200px" />
        <h5 className={styles.cardTypes}>{types[0]} {types[1]}</h5>
      </div>
    </div>
  )
}

export default Card