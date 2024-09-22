import {useEffect, useState} from "react";
import UsuarioServicio from "../services/UsuarioServicio";

let useUsuario = (idUsuario) => {
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, [idUsuario]);

    async function fetchUsuarios() {
        try {
            setLoading(true);
            let response = await UsuarioServicio.findAll();
            setUsuario(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los usuarios");
        } finally {
            setLoading(false);
        }
    }

    async function deleteUsuario(id) {
        try {
            setLoading(true);
            await UsuarioServicio.delete(id);
            fetchUsuarios();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar el usuario");
        } finally {
            setLoading(false);
        }
    }

    async function createUsuario(nombre, correo, contrasennia, tipo) {
        try {
            setLoading(true);
            const usuario = ({
                nombre: nombre,
                correo: email,
                contrasennia: contrasennia,
                tipo: tipo
            });
            await UsuarioServicio.create(usuario);
            fetchUsuarios();
        } catch (error) {
            setError("Ocurrió un error al intentar crear el usuario");
        } finally {
            setLoading(false);
        }
    }

    async function updateUsuario(id, nombre, correo, contrasennia, tipo) {
        try {
            setLoading(true);
            const usuario = ({
                usuarioId: id,
                nombre: nombre,
                correo: email,
                contrasennia: contrasennia,
                tipo: tipo
            });
            await UsuarioServicio.update(id, usuario);
            fetchUsuarios();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar el usuario");
        } finally {
            setLoading(false);
        }
    }

    return {
        usuario,
        loading,
        error,
        deleteUsuario,
        createUsuario,
        updateUsuario
    };
}

export default useUsuario;
