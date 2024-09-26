import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import './assets/css/estilos.css';
import {UsuarioProvider} from "./context/UsuarioContext"; // Importa el archivo de estilos
ReactDOM.render(
    <UsuarioProvider>
    <App/>
    </UsuarioProvider>,
    document.getElementById('root')
);