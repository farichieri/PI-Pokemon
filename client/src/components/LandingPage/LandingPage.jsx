import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'
import imge from './img/pokemon.png'

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <img src={imge} className={styles.pokemon} alt=""/>
                <div className={styles.welcome}>
                <div className={styles.image} />
                <Link to='/home'> 
                <h1 className={styles.enter}>Enter</h1>
                    <button className={styles.enterButton}>...</button>
                </Link>
            </div>
        </div>
    )
}