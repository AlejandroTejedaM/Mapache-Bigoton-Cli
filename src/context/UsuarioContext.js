import  {createContext} from 'react';
const UsuarioContextDefault = createContext(
    {
        usuarioId: 0,
        nombre: "",
        correo: "",
        contrasennia: "",
        token: "",
        setUsuario: (usuario) => {}
    }
);

export default UsuarioContextDefault;