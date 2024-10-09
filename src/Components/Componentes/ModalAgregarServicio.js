import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import useServicio from '../../hooks/useServicio';
import useSucursal from "../../hooks/useSucursal";

const ModalAgregarServicio = ({show, handleClose, handleSave, data}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [sucursalId, setSucursalId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const {sucursales, loading: loadingSucursal, error: errorSucursal} = useSucursal();
    const {servicios, loading: loadingServicio, error: errorServicio} = useServicio();

    useEffect(() => {
        if (sucursales.length > 0 && !sucursalId) {
            setSucursalId(sucursales[0].sucursalId);
        }
    }, [sucursales]);
    useEffect(() => {
        console.log(data)
        if (data) {
            setServicioId(data.servicioId)
            setNombre(data?.nombre);
            setDescripcion(data?.descripcion);
            setPrecio(data?.precio);
            setDuracion(data?.duracion);
            setSucursalId(data?.sucursal?.sucursalId || '');
        }
    }, [data]);



    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name)
        if (name === 'nombre') {
            setNombre(value);
        } else if (name === 'descripcion') {
            setDescripcion(value);
        } else if (name === 'precio') {
            setPrecio(value);
        } else if (name === 'duracion') {
            setDuracion(value);
        } else if (name === 'sucursalId') {
            setSucursalId(value);
            console.log("Cambiada sucursal")
        }

    };

    const handleSubmit = () => {
        const servicio = {
            servicioId: servicioId,
            nombre,
            descripcion,
            precio: parseFloat(precio),
            duracion: parseInt(duracion),
            sucursal: {sucursalId:sucursalId}
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
                    <Form.Group controlId="sucursalId">
                        <div>Sucursal</div>
                        <Form.Control
                            as="select"
                            name="sucursalId"
                            value={sucursalId}
                            onChange={handleChange}
                            required
                        >
                            {sucursales.map(sucursal => (
                                <option key={sucursal.sucursalId} value={sucursal.sucursalId}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                        </Form.Control>
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
