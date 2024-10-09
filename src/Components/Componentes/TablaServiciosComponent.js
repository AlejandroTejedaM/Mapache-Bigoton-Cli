import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import ModalConfirmacionGenerico from '../Componentes/ModalConfirmacionGenerico';
import useServicio from '../../hooks/useServicio';

const TablaServiciosComponent = ({onEditServicio, refresh}) => {
    const {servicios, loading, error, deleteServicio, updateServicio, fetchServicio} = useServicio();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState(null);
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
        if (!loading && servicios.length > 0) {
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
        console.log(servicios)
    }, [loading, servicios]);

    useEffect(() => {
        fetchServicio();
    }, [refresh]);

    const handleDelete = (servicio) => {
        setSelectedServicio(servicio);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        await deleteServicio(selectedServicio.servicioId);
        setShowConfirmModal(false);
    };

    const handleEditServicio = async (servicio) => {
        await updateServicio(servicio);
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
                <h5 className="card-title">Tabla de Servicios</h5>
                <p className="text-subtitle text-muted">
                    Lista de servicios.
                </p>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table ref={tableRef} className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Duracion</th>
                            <th>Sucursal</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.servicioId}>
                                <td>{servicio.servicioId}</td>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.descripcion}</td>
                                <td>{servicio.precio}</td>
                                <td>{servicio.duracion}</td>
                                <td>{servicio.sucursal.nombre}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2"
                                            onClick={() => onEditServicio(servicio, handleEditServicio)}>Editar
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(servicio)}>Eliminar
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
                message="¿Está seguro de que desea eliminar este servicio?"
            />
        </div>
    );
}

export default TablaServiciosComponent;