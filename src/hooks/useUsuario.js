import {useEffect, useState} from "react";
import UsuarioServicio from "../services/UsuarioServicio";

let useUsuario = (idUsuario) => {
    const [usuarios, setUsuarios] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, [idUsuario]);

    async function fetchUsuarios() {
        try {
            setLoading(true);
            let response = await UsuarioServicio.findAll();
            setUsuarios(response.data);
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
            setError("Ocurrió un error al intentar eliminar el usuarios");
        } finally {
            setLoading(false);
        }
    }

    async function createUsuario(nombre, correo, contrasennia, tipo) {
        try {
            setLoading(true);
            const usuario = ({
                nombre: nombre,
                correo: correo,
                contrasennia: contrasennia,
                tipo: tipo
            });
            console.log(tipo)
            console.log(usuario);
            await UsuarioServicio.create(usuario);
            console.log("Usuario creado con éxito");
            fetchUsuarios();
        } catch (error) {
            console.log(error);
            setError("Ocurrió un error al intentar crear el usuarios");
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
                correo: correo,
                contrasennia: contrasennia,
                tipo: tipo
            });
            await UsuarioServicio.update(id, usuario);
            fetchUsuarios();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar el usuarios");
        } finally {
            setLoading(false);
        }
    }

    return {
        usuarios: usuarios,
        loading,
        error,
        deleteUsuario,
        createUsuario,
        updateUsuario,
        fetchUsuarios
    };
}

export default useUsuario;
