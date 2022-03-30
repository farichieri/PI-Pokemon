import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() { // Acá se hace el ruteo // El switch envuelve a las rutas y va a ir un por una.-
  return (
    <BrowserRouter>
      {/* <div className="App"> */}
        <Routes> 
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
