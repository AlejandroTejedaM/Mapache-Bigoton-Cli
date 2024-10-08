import {useEffect, useState} from "react";
import barberoService from "../services/BarberoService";

let UseBarbero = (sucursalId) => {
    const [barberos, setBarberos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sucursalId) {
            fetchBarberos(sucursalId);
        }
    }, [sucursalId]);

    const fetchBarberos = async (sucursalId) => {
        try {
            setLoading(true);
            const response = await barberoService.findBySucursalId(sucursalId);
            setBarberos(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los barberos");
        } finally {
            setLoading(false);
        }
    };

    async function deleteBarbero(id) {
        try {
            setLoading(true);
            await barberoService.delete(id);
            fetchBarberos();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar el barbero");
        } finally {
            setLoading(false);
        }
    }

    async function createBarbero(nombre, sucursalId) {
        try {
            setLoading(true);
            const barbero = ({
                nombre: nombre,
                sucursal: {
                    sucursalId: sucursalId
                }
            });
            await barberoService.create(barbero);
            fetchBarberos();
        } catch (error) {
            setError("Ocurrió un error al intentar crear el barbero");
        } finally {
            setLoading(false);
        }
    }

    async function updateBarbero(id, nombre, sucursalId) {
        try {
            setLoading(true);
            const barbero = ({
                nombre: nombre,
                sucursal: {
                    sucursalId: sucursalId
                }
            });
            await barberoService.update(id, barbero);
            fetchBarberos();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar el barbero");
        } finally {
            setLoading(false);
        }
    }

    return {
        barberos,
        loading,
        error,
        deleteBarbero,
        createBarbero,
        updateBarbero
    };
}

export default UseBarbero;