import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import dotenv from "dotenv";
import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"
// Seteo a axios en su propiedad defaults, la propiedad baseURL. 
// Creo un archivo de variable de entorno local en donde estaría el localhost.
// En este caso, pregunto si existe la variable de entorno REACT_APP_API y sino hay nada, defino la variable "https...."


ReactDOM.render(
  // Si no envuelvo mi archivo raíz en un PROVIDER, Redux no va a dar bolilla.
  <Provider store={store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
