import { useState, useEffect } from 'react';
import ServicioService from '../services/ServicioService';

const useServicio = (sucursalId) => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServicio();
    }, []);

    const fetchServicio = async () => {
        try {
            setLoading(true);
            const response = await ServicioService.findAll();
            setServicios(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener los servicios");
        } finally {
            setLoading(false);
        }
    }
    const createServicio = async (servicio) => {
        try {
            await ServicioService.create(servicio);
        } catch (error) {
            setError('Error creating servicio');
        }
    };

    const deleteServicio = async (id) => {
        try {
            await ServicioService.delete(id);
        } catch (error) {
            setError('Error deleting servicio');
        }
    };

    const updateServicio = async (id, servicio) => {
        try {
            await ServicioService.update(id, cita);
            console.log("Servicio actualizado");
        } catch (error) {
            setError('Error updating servicio');
        }
    }

    return { servicios, loading, error, createServicio, deleteServicio, updateServicio, fetchServicio}
};

export default useServicio;