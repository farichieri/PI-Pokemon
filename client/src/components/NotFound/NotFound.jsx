import React from "react";
import styles from './NotFound.module.css'
import notFound from './img/notFound.gif'


export default function NotFound(){
    return(
        <div className={styles.notFound}>
            <img src={notFound} alt="gif" />
            <h1>Pokemon Not Found</h1>
        </div>
    );
}