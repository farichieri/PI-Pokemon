import React from "react";
import styles from './Loader.module.css'
import charizardLoader from './img/loader.gif'


export default function Loader(){
    return(
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
                <img src={charizardLoader} alt="gif" />
                <h1>Loading...</h1>
            </div>
        </div>
    );
}