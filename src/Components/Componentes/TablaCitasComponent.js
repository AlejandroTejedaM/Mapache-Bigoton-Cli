import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import {format} from 'date-fns';
import useCitas from '../../hooks/useCitas';
import ModalConfirmacionGenerico from '../Componentes/ModalConfirmacionGenerico';

const TablaCitasComponent = ({onEditCita, refresh}) => {
    const {citas, loading, error, deleteCita, updateCita, fetchCitas} = useCitas();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
        if (!loading && citas.length > 0) {
            if (tableInstance.current) {
                tableInstance.current.destroy();
            }
            tableInstance.current = $(tableRef.current).DataTable({
                pageLength: 5,
                searching: false,
                lengthChange: false,
                orderMulti: true,
            });
        }
    }, [loading, citas]);

    useEffect(() => {
        fetchCitas();
    }, [refresh]);

    const handleDelete = (cita) => {
        setSelectedCita(cita);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        await deleteCita(selectedCita.citaId);
        setShowConfirmModal(false);
        fetchCitas();
    };

    const handleEditCita = async (cita) => {
        await updateCita(cita);
        fetchCitas();
    };

    if (loading) {
        return <div className={"text-center"}>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Tabla de Citas</h5>
                <p className="text-subtitle text-muted">
                    Lista de citas ordenable, buscable y paginada.
                </p>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table ref={tableRef} className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha y Hora</th>
                            <th>Sucursal</th>
                            <th>Servicio</th>
                            <th>Cliente</th>
                            <th>Barbero</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.citaId}>
                                <td>{cita.citaId || "N/A"}</td>
                                <td>{format(new Date(cita.fechaHora), 'dd/MM/yyyy HH:mm')}</td>
                                <td>{cita.barbero.sucursal.nombre}</td>
                                <td>{cita.servicio?.nombre || 'N/A'}</td>
                                <td>{cita.user?.nombre || 'N/A'}</td>
                                <td>{cita.barbero?.nombre || 'N/A'}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2"
                                            onClick={() => onEditCita(cita, handleEditCita)}>Editar
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(cita)}>Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalConfirmacionGenerico
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                handleConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Está seguro de que desea eliminar esta cita?"
            />
        </div>
    );
}

export default TablaCitasComponent;