import {useEffect, useState} from "react";
import ServicioService from "../services/ServicioService";

let useServicio = (servicioId) => {
    const [servicio, setServicio] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServicios();
    }, [servicioId]);

    async function fetchServicios() {
        try {
            setLoading(true);
            let response = await ServicioService.findAll();
            setServicio(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los servicios");
        } finally {
            setLoading(false);
        }
    }

    async function deleteServicio(id) {
        try {
            setLoading(true);
            await ServicioService.delete(id);
            fetchUsuarios();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar el servicio");
        } finally {
            setLoading(false);
        }
    }

    async function createServicio(nombre, descripcion, precio, duracion) {
        try {
            setLoading(true);
            const servicio = ({
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                duracion: duracion
            });
            await ServicioService.create(servicio);
            fetchServicios();
        } catch (error) {
            setError("Ocurrió un error al intentar crear el servicio");
        } finally {
            setLoading(false);
        }
    }

    async function updateServicio(id, nombre, descripcion, precio, duracion) {
        try {
            setLoading(true);
            const servicio = ({
                servicioId: id,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                duracion: duracion
            });
            await ServicioService.update(id, servicio);
            fetchServicios();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar el servicio");
        } finally {
            setLoading(false);
        }
    }

    return {
        servicio,
        loading,
        error,
        deleteServicio,
        createServicio,
        updateServicio
    };
}

export default useServicio;