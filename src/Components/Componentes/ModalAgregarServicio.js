import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import useServicio from '../../hooks/useServicio';

const ModalAgregarServicio = ({show, handleClose, handleSave, data}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const {servicios, loading: loadingServicio, error: errorServicio} = useServicio();

    useEffect(() => {
        if (data) {
            setNombre(data.servicios?.nombre || '');
            setDescripcion(data.servicios?.descripcion || '');
            setPrecio(data.servicios?.precio || '');
            setDuracion(data.servicios?.duracion || '');
        }
    }, [data]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'nombre') {
            setNombre(value);
        } else if (name === 'descripcion') {
            setDescripcion(value);
        } else if (name === 'precio') {
            setPrecio(value);
        } else if (name === 'duracion') {
            setDuracion(value);
        }
    };

    const handleSubmit = () => {
        const servicio = {
            servicioId: data ? data.servicioId : null,
            nombre,
            descripcion,
            precio: parseFloat(precio),
            duracion: parseInt(duracion)
        };
        handleSave(servicio);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombre">
                        <div>Nombre del Servicio</div>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={handleChange}
                            name="nombre"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcion">
                        <div>Descripción</div>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descripcion}
                            onChange={handleChange}
                            name="descripcion"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="precio">
                        <div>Precio</div>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={precio}
                            onChange={handleChange}
                            name="precio"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="duracion">
                        <div>Duración (en minutos)</div>
                        <Form.Control
                            type="number"
                            value={duracion}
                            onChange={handleChange}
                            name="duracion"
                            required
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

export default ModalAgregarServicio;
