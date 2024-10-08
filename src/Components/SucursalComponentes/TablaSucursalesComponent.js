import React, {useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import useSucursales from '../../hooks/useSucursal';
import ModalConfirmacionGenerico from "./ModalConfirmacionGenerico"; // Asegúrate de que la ruta sea correcta

const TablaSucursalesComponent = ({ onEditSucursal }) => {

    const { sucursales, loading, error, deleteSucursal, editSucursal, fetchSucursales } = useSucursales();
    const [sucursalId, setSucursalId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = () => window.location.reload();
    const handleClose = () => setShowModal(false);
    const handleConfirm = async () => {
        await deleteSucursal(sucursalId);
        handleClose();
        navigate(0);
    }

    const handleSelectEliminated = (sucursalId) => {
        setSucursalId(sucursalId);
        setShowModal(true);
    }
    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                </tr>
            </thead>
            <tbody>
                {sucursales.map((sucursal) => (
                    <tr key={sucursal.sucursalId}>
                        <td>{sucursal.sucursalId}</td>
                        <td>{sucursal.nombre}</td>
                        <td>{sucursal.direccion}</td>
                        <td>
                            <Button variant="info" onClick={() => onEditSucursal(sucursal)}>Editar</Button>
                            <Button variant="danger" onClick={() => handleSelectEliminated(sucursal.sucursalId)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <ModalConfirmacionGenerico
            show={showModal}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            title="Eliminar Sucursal"
            message="¿Está seguro de eliminar la sucursal?"
        />
    </div>
    );
};

export default TablaSucursalesComponent;