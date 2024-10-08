import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const ModalAgregarSucursal = ({show, handleClose, handleSave, data}) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        if (data) {
            setNombre(data.nombre || '');
            setDireccion(data.direccion || '');
            setTelefono(data.telefono || '');
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nombre') {
            setNombre(value);
        } else if (name === 'direccion') {
            setDireccion(value);
        } else if (name === 'telefono') {
            setTelefono(value);
        }
    };

    const handleSubmit = () => {
        const sucursal = {
            id: data ? data.id : null,
            nombre,
            direccion,
            telefono,
        };
        handleSave(sucursal);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Editar Sucursal' : 'Agregar Sucursal'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombre">
                        <div>Nombre</div>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="direccion">
                        <div>Dirección</div>
                        <Form.Control
                            type="text"
                            name="direccion"
                            value={direccion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <div>Teléfono</div>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={telefono}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleSubmit}>
                    {data ? 'Actualizar' : 'Agregar'}
                </Button>
                <Button variant="light" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAgregarSucursal;
