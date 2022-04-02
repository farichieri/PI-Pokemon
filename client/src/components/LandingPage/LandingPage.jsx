import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <div className={styles.welcome}>
                <div className={styles.image} />
                <Link to='/home'> 
                    <button className={styles.enter}>X</button>
                </Link>
            </div>
        </div>
    )
}