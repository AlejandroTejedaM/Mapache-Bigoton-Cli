import React from 'react';
import logo from '../../img/LogoP.png';
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
    return (
        <header className="header">
            <div className="contenedor-header">
                <div className="logo">
                    <Link to={"/"}>
                        <img className="img-logo" src={logo} alt="Logo principaa"/>
                    </Link>
                </div>
                <div className="navegacion">
                    <Link className="nav" to="/">Inicio</Link>
                    <Link className="nav" to="/galeria">Galería</Link>
                    <Link className="nav" to="/servicios">Servicios</Link>
                    <Link className="nav" to="/agenda">Agenda</Link>
                    <Link className="nav" to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="32"
                             height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M16 19h6" />
                            <path d="M19 16v6" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
