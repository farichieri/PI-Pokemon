import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <div className={styles.welcome}>
                <Link to='/home'> 
                <img className={styles.image} />
                    <button className={styles.enter}> ENTER </button>
                </Link>
            </div>
        </div>
    )
}