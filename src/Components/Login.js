import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UsuarioContext from "../context/UsuarioContext";
import UsuarioServicio from "../services/UsuarioServicio";

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasennia, setContrasennia] = useState('');
    const [error, setError] = useState(null);
    const { setUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const usuario = { correo, contrasennia };
            const response = await UsuarioServicio.login(usuario);
            const token = response.data;

            if (token) {
                localStorage.setItem('token', token);
                const userResponse = await UsuarioServicio.findyByCorreo(correo);
                const userData = userResponse.data;
                setUsuario(prevState => ({
                    ...prevState,
                    ...userData,
                    token: token,
                    isLogged: true
                }));

                navigate('/'); // Redirige a la página principal
            } else {
                setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
            } else {
                setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo.');
            }
        }
    };

    return (
        <div className="background">
            <div className="formulario">
                <h1>INICIO DE SESIÓN</h1>
                <form onSubmit={handleSubmit}>
                    <div className="username">
                        <input
                            type="text"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                        <label>Nombre de usuario</label>
                    </div>
                    <div className="contraseña">
                        <input
                            type="password"
                            value={contrasennia}
                            onChange={(e) => setContrasennia(e.target.value)}
                            required
                        />
                        <label>Ingresar contraseña</label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div>
                        <input type="submit" value="Ingresar" />
                        <div className="Registrarse">
                            Si no tienes una cuenta <a href="#">Regístrate aquí</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;