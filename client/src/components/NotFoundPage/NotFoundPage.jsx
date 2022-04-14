import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import styles from './NotFoundPage.module.css'
import { cleanDetail, cleanPokemons } from '../../actions';

function NotFoundPage() {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(cleanDetail());
        dispatch(cleanPokemons());
    }

  return (
    <div className={styles.notFoundPageContainer}>
        <nav className={styles.exitSearchAndCreateNav}>
            <div className={styles.backContainer}>
              <Link to="/home"><h1 className={styles.back} onClick={() => handleClick()}>Home</h1></Link>
            </div>
        </nav>
        <div className={styles.notFoundPageText}>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
        </div>
    </div>
  )
}

export default NotFoundPage