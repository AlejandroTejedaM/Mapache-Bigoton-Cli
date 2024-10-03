import {createContext, useState} from 'react';

const ServicioContext = createContext();

export const ServicioProvider = ({ children }) => {
    const [servicio, setServicio] = useState({
            token: null,
            isLogged: false,
            // Agrega otras propiedades del servicio según sea necesario
    });
    return (
        <ServicioContext.Provider value={{ servicio, setServicio }}>
                {children}
        </ServicioContext.Provider>
    );
};

export default ServicioContext;