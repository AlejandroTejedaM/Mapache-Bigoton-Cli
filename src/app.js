import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Gallery from './Components/Gallery/Gallery';
import Services from './Components/Home/Services';
import Schedule from './Components/Home/Citas';
import Sucursal from './Components/Home/Sucursal';
import Login from './Components/Login';
import UsuarioContext from './context/UsuarioContext';

const App = () => {
    const { usuario, setUsuario } = useContext(UsuarioContext);
    const isLogged = usuario.isLogged;

    useEffect(() => {
        const token = "1"; //localStorage.getItem('token');
        if (token) {
            setUsuario(prevState => ({
                ...prevState,
                token: token,
                isLogged: true
            }));
        }
    }, [setUsuario]);

    return (
        <BrowserRouter>
            <div className="App">
                {isLogged ? (
                    <>
                        <Header />
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/galeria" element={<Gallery />} />
                                <Route path="/servicios" element={<Services />} />
                                <Route path="/agenda" element={<Schedule />} />
                                <Route path="/sucursal" element={<Sucursal />} /> {/* Nueva ruta para Sucursal */}
                            </Routes>
                        </div>
                        <Footer />
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
