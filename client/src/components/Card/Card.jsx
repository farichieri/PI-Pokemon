import React from 'react'
import styles from './Card.module.css'

function Card( { name, img, types }) {
  return (
    <div className={styles.card}>
        <h3>{name}</h3>
        <h5>{types}</h5>
        <img src={img} alt="img not found" width="200px" height="200px" />
    </div>
  )
}

export default Card