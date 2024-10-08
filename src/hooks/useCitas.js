import { useState, useEffect } from 'react';
import citaService from '../services/CitaService';

const useCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        try {
            setLoading(true);
            const response = await citaService.findAll();
            setCitas(response.data);
        } catch (error) {
            setError('Error fetching citas');
        } finally {
            setLoading(false);
        }
    };

    const createCita = async (cita) => {
        try {
            await citaService.create(cita);
            await fetchCitas(); // Refresh the list of appointments
        } catch (error) {
            setError('Error creating cita');
        }
    };

    const deleteCita = async (id) => {
        try {
            await citaService.delete(id);
            await fetchCitas(); // Refresh the list of appointments
        } catch (error) {
            setError('Error deleting cita');
        }
    };

    const updateCita = async (id, cita) => {
        try {
            await citaService.update(id, cita);
            await fetchCitas(); // Refresh the list of appointments
            console.log("Cita actualizada");
        } catch (error) {
            setError('Error updating cita');
        }
    }

    return { citas, loading, error, createCita, deleteCita, updateCita, fetchCitas }
};

export default useCitas;