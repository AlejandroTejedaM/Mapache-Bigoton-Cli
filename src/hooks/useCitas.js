import {useEffect, useState} from "react";
import citaService from "../services/CitaService";

let  useCitas = (idCita) => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCitas();
    }, [idCita]);

    async function fetchCitas() {
        try {
            setLoading(true);
            const response = await citaService.findAll();
            setCitas(response.data);
        } catch (error) {
            setError("Ocurrió un error al intentar obtener las citas");
        } finally {
            setLoading(false);
        }
    }

    async function deleteCita(id) {
        try {
            setLoading(true);
            await citaService.delete(id);
            fetchCitas();
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar la cita");
        } finally {
            setLoading(false);
        }
    }

    async function createCita(fechaHora, idServicio, idUsuario, idBarbero) {
        try {
            setLoading(true);
            const cita = ({
                fechaHora: fechaHora,
                servicio: {
                    servicioId: idServicio
                },
                usuario: {
                    usuarioId: idUsuario
                },
                barbero: {
                    barberoId: idBarbero
                }
            });
            await citaService.create(cita);
            fetchCitas();
        } catch (error) {
            setError("Ocurrió un error al intentar crear la cita");
        } finally {
            setLoading(false);
        }
    }

    async function updateCita(id, fechaHora, idServicio, idUsuario, idBarbero) {
        try {
            setLoading(true);
            const cita = ({
                citaId: id,
                fechaHora: fechaHora,
                servicio: {
                    servicioId: idServicio
                },
                usuario: {
                    usuarioId: idUsuario
                },
                barbero: {
                    barberoId: idBarbero
                }
            });
            await citaService.update(id, cita);
            fetchCitas();
        } catch (error) {
            setError("Ocurrió un error al intentar actualizar la cita");
        } finally {
            setLoading(false);
        }
    }



    return {citas, loading, error};
}

export default useCitas;