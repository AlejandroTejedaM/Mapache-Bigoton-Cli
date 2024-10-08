import React, {useEffect, useRef, useState} from 'react';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import useCitas from '../../hooks/useServicio';

const TablaServiciosComponent = () => {
    const {servicios, loading, error} = useCitas();
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
    }, [loading, servicios]);

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
                    <h5 className="card-title">Tabla de Servicios</h5>
                    <p className="text-subtitle text-muted">
                        Lista de servicios ordenable, buscable y paginada.
                    </p>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table ref={tableRef} className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Dirección</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {servicios.map((servicio) => (
                                <tr key={servicio.servicioId}>
                                    <td>{servicio.servicioId}</td>
                                    <td>{servicio.direccion || "N/A"}</td>
                                    <td>{servicio.nombre || "N/A"}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2"
                                                onClick={() => handleEdit(servicio)}>Editar
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(servicio.servicioId)}>Eliminar
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

export default TablaServiciosComponent;