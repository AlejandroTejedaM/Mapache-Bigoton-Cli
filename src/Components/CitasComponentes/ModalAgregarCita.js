import React, {useState, useEffect, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import UsuarioContext from '../../context/UsuarioContext';
import useBarbero from '../../hooks/useBarbero';
import useServicio from '../../hooks/useServicio';
import useSucursal from "../../hooks/useSucursal";
import {format} from "date-fns";

const ModalAgregarCita = ({show, handleClose, handleSave, data}) => {
    const {usuario} = useContext(UsuarioContext);
    const [fechaHora, setFechaHora] = useState('');
    const [sucursalId, setSucursalId] = useState('');
    const [servicioId, setServicioId] = useState('');
    const [barberoId, setBarberoId] = useState('');
    const {sucursales, loading: loadingSucursal, error: errorSucursal} = useSucursal();
    const {barberos, loading: loadingBarbero, error: errorBarbero} = useBarbero(sucursalId);
    const {servicios, loading: loadingServicio, error: errorServicio} = useServicio(sucursalId);

    useEffect(() => {
        if (sucursales.length > 0 && !sucursalId) {
            setSucursalId(sucursales[0].sucursalId);
        }
    }, [sucursales]);

    useEffect(() => {
        if (data) {
            setFechaHora(format(new Date(data.fechaHora), 'yyyy-MM-dd\'T\'HH:mm'));
            setSucursalId(data.servicio?.sucursal?.sucursalId || '');
            setServicioId(data.servicio?.servicioId || '');
            setBarberoId(data.barbero?.barberoId || '');
        }
    }, [data]);

    useEffect(() => {
        if (sucursalId) {
            if (servicios.length > 0) {
                setServicioId(servicios[0].servicioId);
            }
            if (barberos.length > 0) {
                setBarberoId(barberos[0].barberoId);
            }
        }
    }, [sucursalId, servicios, barberos]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value);
        if (name === 'sucursalId') {
            setSucursalId(value);
            console.log(value);
        } else if (name === 'servicioId') {
            setServicioId(value);
            console.log(value);
        } else if (name === 'barberoId') {
            setBarberoId(value);
            console.log(value);
        } else if (name === 'fechaHora') {
            setFechaHora(value);
            console.log(value);
        }
    };

    const handleSubmit = () => {
        const cita = {
            citaId: data ? data.citaId : null,
            fechaHora,
            servicio: {servicioId: servicioId},
            user: {usuarioId: usuario.usuarioId},
            barbero: {barberoId: barberoId}
        }
        handleSave(cita);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Editar Cita' : 'Agregar Cita'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="fechaHora">
                        <div>Fecha y Hora</div>
                        <Form.Control
                            type="datetime-local"
                            value={fechaHora}
                            onChange={handleChange}
                            name="fechaHora"
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
                    <Form.Group controlId="servicioId">
                        <div>Servicio</div>
                        <Form.Control
                            as="select"
                            name="servicioId"
                            value={servicioId}
                            onChange={handleChange}
                            required
                        >
                            {servicios.map(servicio => (
                                <option key={servicio.servicioId} value={servicio.servicioId}>
                                    {servicio.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="barberoId">
                        <div>Barbero</div>
                        <Form.Control
                            as="select"
                            name="barberoId"
                            value={barberoId}
                            onChange={handleChange}
                            required
                        >
                            {barberos.map(barbero => (
                                <option key={barbero.barberoId} value={barbero.barberoId}>
                                    {barbero.nombre}
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

export default ModalAgregarCita;