import React from "react";
import styles from './Loader.module.css'
import pokeBall from './img/loader.gif'


export default function Loader(){
    return(
        <div className={styles.loading}>
            <img src={pokeBall} alt="gif" />
            <h1>PAGINA CARGANDO CAPO</h1>
        </div>
    );
}