import {createContext, useState} from 'react';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
        const [usuario, setUsuario] = useState({
                token: null,
                isLogged: false,
                usuarioId: "3",
                // Agrega otras propiedades del usuario según sea necesario
        });
        return (
            <UsuarioContext.Provider value={{ usuario, setUsuario }}>
                    {children}
            </UsuarioContext.Provider>
        );
};

export default UsuarioContext;