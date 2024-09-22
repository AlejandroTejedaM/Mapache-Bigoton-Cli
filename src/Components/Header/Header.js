import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="contenedor-header">
                <div className="logo">
                    <a routerLink="/">
                        <img className="img-logo" src="/src/img/Logo.png" alt="Logo principal" />
                    </a>
                </div>
                <div className="navegacion">
                    <a className="nav" href="/">Inicio</a>
                    <a className="nav" href="/galeria">Galería</a>
                    <a className="nav" href="/servicios">Servicios</a>
                    <a className="nav" href="/agenda">Agenda</a>
                    <a className="nav" href="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="32"
                             height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M16 19h6" />
                            <path d="M19 16v6" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
