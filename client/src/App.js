import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';

function App() { // Acá se hace el ruteo // 
  return (
    <BrowserRouter>
        <Routes> 
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pokemons' element={<PokemonCreate />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
