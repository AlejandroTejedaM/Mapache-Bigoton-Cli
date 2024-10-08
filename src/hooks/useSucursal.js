import { useState, useEffect } from 'react';
import SucursalServicio from '../services/SucursalService';

const useSucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSucursales();
    }, []);

    const fetchSucursales = async () => {
        try {
            setLoading(true);
            const response = await SucursalServicio.findAll();
            setSucursales(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar las sucursales');
        } finally {
            setLoading(false);
        }
    };

    const addSucursal = async (sucursal) => {
        try {
            await SucursalServicio.create(sucursal);
            fetchSucursales();
        } catch (err) {
            setError('Error al añadir la sucursal');
        }
    };

    const editSucursal = async (id, sucursal) => {
        try {
            await SucursalServicio.update(id, sucursal);
            fetchSucursales();
        } catch (err) {
            setError('Error al editar la sucursal');
        }
    };

    const deleteSucursal = async (id) => {
        try {
            await SucursalServicio.delete(id);
            fetchSucursales();
        } catch (err) {
            setError('Error al eliminar la sucursal');
        }
    };

    return { sucursales, loading, error, addSucursal, editSucursal, deleteSucursal };
};

export default useSucursales;