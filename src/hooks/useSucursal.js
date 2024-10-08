import {useEffect, useState} from "react";
import sucursalService from "../services/SucursalService";
import barberoService from "../services/BarberoService";

let UseSucursal = (idSucursal) => {
    const [sucursales, setSucursales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSucursales();
    }, [idSucursal]);

    async function fetchSucursales() {
        try {
            setLoading(true);
            const response = await sucursalService.findAll();
            setSucursales(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los barberos");
        } finally {
            setLoading(false);
        }
    }

    async function deleteSucursal(id) {
        try {
            setLoading(true);
            await sucursalService.delete(id);
            fetchSucursales();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar la sucursal");
        } finally {
            setLoading(false);
        }
    }

    async function createSucursal(nombre, direccion) {
        try {
            setLoading(true);
            const sucursal = ({
                nombre: nombre,
                direccion: direccion
            });
            await sucursalService.create(sucursal);
            fetchSucursales();
        } catch (error) {
            setError("Ocurrió un error al intentar crear la sucursal");
        } finally {
            setLoading(false);
        }
    }

    async function updateSucursal(id, nombre, direccion) {
        try {
            setLoading(true);
            const sucursal = ({
                nombre: nombre,
                direccion: direccion
            });
            await sucursalService.update(id, sucursal);
            fetchSucursales();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar la sucursal");
        } finally {
            setLoading(false);
        }
    }

    return {
        sucursales,
        loading,
        error,
        deleteSucursal,
        createSucursal,
        updateSucursal
    };
}

export default UseSucursal;