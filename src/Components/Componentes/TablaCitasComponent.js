import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import {format} from 'date-fns';
import useCitas from '../../hooks/useCitas';

const TablaCitasComponent = () => {
    const {citas, loading, error} = useCitas();
    const [tableInitialized, setTableInitialized] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {
        if (!loading && !tableInitialized) {
            const table = $(tableRef.current).DataTable({
                responsive: true,
                autoWidth: false,
                pageLength: 5,
                searching: false,
                lengthChange: false,
                orderMulti: true,
            });
            setTableInitialized(true);

            return () => {
                table.destroy();
                setTableInitialized(false);
            };
        }
    }, [loading, citas]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="section">
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
                                <th>Servicio</th>
                                <th>Cliente</th>
                                <th>Barbero</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.citaId}>
                                    <td>{cita.citaId}</td>
                                    <td>{format(new Date(cita.fechaHora), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{cita.servicio?.nombre || "N/A"}</td>
                                    <td>{cita.user?.nombre || "N/A"}</td>
                                    <td>{cita.barbero?.nombre || "N/A"}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2"
                                                onClick={() => handleEdit(cita)}>Editar
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(cita.citaId)}>Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablaCitasComponent;