import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Details from './components/Details/Details';
import Update from './components/Update/Update';

function App() {
  return (
    <BrowserRouter>
        <Routes> 
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<Details/>} />
          <Route path='/update/:id' element={<Update/>} />
          <Route path='/pokemons' element={<PokemonCreate />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
