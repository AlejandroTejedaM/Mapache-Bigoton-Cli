import React from 'react';
import { Table, Button } from 'react-bootstrap';
import useSucursales from '../../hooks/useSucursal'; // Asegúrate de que la ruta sea correcta

const TablaSucursalesComponent = ({ onEditSucursal }) => {

    const { sucursales, loading, error, deleteSucursal, editSucursal, fetchSucursales } = useSucursales();


    return (
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
                    <tr key={sucursal.id}>
                        <td>{sucursal.id}</td>
                        <td>{sucursal.nombre}</td>
                        <td>{sucursal.direccion}</td>
                        <td>
                            <Button variant="info" onClick={() => onEditSucursal(sucursal)}>Editar</Button>
                            <Button variant="danger" onClick={() => deleteSucursal(sucursal.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        
    );
};

export default TablaSucursalesComponent;