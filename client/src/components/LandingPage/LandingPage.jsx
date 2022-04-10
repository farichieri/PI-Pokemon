import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './LandingPage.module.css'
import styles from './LandingPage2.module.css'
// import styles from './LandingPage3.module.css'
// import imge from './img/pokemon.png'

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <div className={styles.welcomAfterHover}>
                <h1>Welcome</h1>
            </div>
            {/* <img src={imge} className={styles.pokemon} alt=""/> */}
            <div className={styles.welcome}>
                <div className={styles.image} />
                <Link to='/home'> 
                {/* <h1 className={styles.enter}></h1> */}
                    <button className={styles.enterButton}>...</button>
                </Link>
            </div>
        </div>
    )
}