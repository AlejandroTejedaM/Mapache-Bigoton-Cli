import {useEffect, useState} from "react";
import servicioService from "../services/ServicioService";

let useServicio = (sucursalId) => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sucursalId) {
            fetchServicios(sucursalId);
        }
    }, [sucursalId]);

    const fetchServicios = async (sucursalId) => {
        try {
            setLoading(true);
            const response = await servicioService.findBySucursalId(sucursalId);
            setServicios(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los servicios");
        } finally {
            setLoading(false);
        }
    };

    async function deleteServicio(id) {
        try {
            setLoading(true);
            await servicioService.delete(id);
            fetchServicios();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar el servicio");
        } finally {
            setLoading(false);
        }
    }

    async function createServicio(nombre, descripcion, precio, duracion, sucursalId) {
        try {
            setLoading(true);
            const servicio = ({
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                duracion: duracion,
                sucursal: {
                    sucursalId: sucursalId
                }
            });
            await servicioService.create(servicio);
            fetchServicios();
        } catch (error) {
            setError("Ocurrió un error al intentar crear el servicio");
        } finally {
            setLoading(false);
        }
    }

    async function updateServicio(id, nombre, descripcion, precio, duracion, sucursalId) {
        try {
            setLoading(true);
            const servicio = ({
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                duracion: duracion,
                sucursal: {
                    sucursalId: sucursalId
                }
            });
            await servicioService.update(id, servicio);
            fetchServicios();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar el servicio");
        } finally {
            setLoading(false);
        }
    }

    return {
        servicios,
        loading,
        error,
        deleteServicio,
        createServicio,
        updateServicio
    };
}

export default useServicio;