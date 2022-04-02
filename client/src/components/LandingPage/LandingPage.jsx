import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Bienvenidos a mi POKEPAGE REYESSS</h1>
            <Link to='/home'> 
                <button> INGRESA BROTHER </button>
            </Link>
        </div>
    )
}