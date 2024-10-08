import {useEffect, useState} from "react";
import SucursalServicio from "../services/SucursalServicio";

let useSucursal = (idSucursal) => {
    const [sucursal, setSucursal] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSucursales();
    }, [idSucursal]);

    async function fetchSucursales() {
        try {
            setLoading(true);
            let response = await SucursalServicio.findAll();
            setSucursal(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener las sucursales");
        } finally {
            setLoading(false);
        }
    }

    async function deleteSucursal(id) {
        try {
            setLoading(true);
            await SucursalServicio.delete(id);
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
            await UsuarioServicio.create(sucursal);
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
                sucursalId: id,
                nombre: nombre,
                direccion: direccion
            });
            await SucursalServicio.update(id, sucursal);
            fetchSucursales();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar la sucursal");
        } finally {
            setLoading(false);
        }
    }

    return {
        sucursal,
        loading,
        error,
        deleteSucursal,
        createSucursal,
        updateSucursal
    };
}

export default useSucursal;
