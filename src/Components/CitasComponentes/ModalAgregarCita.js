import React, {useState, useEffect, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import UsuarioContext from '../../context/UsuarioContext';
import useBarbero from '../../hooks/useBarbero';
import useServicio from '../../hooks/useServicio';
import useSucursal from "../../hooks/useSucursal";
import {format} from "date-fns";

const ModalAgregarCita = ({show, handleClose, handleSave, data}) => {
    const {usuario} = useContext(UsuarioContext);
    const [formData, setFormData] = useState({
        fechaHora: data ? format(new Date(data.fechaHora), 'yyyy-MM-dd\'T\'HH:mm') : '',
        sucursal: {sucursalId: data?.servicio?.sucursal?.sucursalId || ''},
        servicio: {servicioId:  data?.servicio?.servicioId || ''},
        barbero : {barberoId: data?.barbero?.barberoId || ''},
        user : {usuarioId: usuario.usuarioId},
        citaId : data?.citaId || null
    });

    const {sucursales, loading: loadingSucursal, error: errorSucursal} = useSucursal();
    const [sucursalId, setSucursalId] = useState(formData.sucursal.sucursalId);
    const {barberos, loading: loadingBarbero, error: errorBarbero} = useBarbero(sucursalId);
    const {servicios, loading: loadingServicio, error: errorServicio} = useServicio(sucursalId);

    useEffect(() => {
        if (sucursales.length > 0 && !formData.sucursal.sucursalId) {
            const firstSucursal = sucursales[0].sucursalId;
            setFormData((prevData) => ({
                ...prevData,
                sucursal : { sucursalId: data?.servicio?.sucursal?.sucursalId || firstSucursal}
            }));
            setSucursalId(data?.servicio?.sucursal?.sucursalId || firstSucursal);
        }
    }, [sucursales, data]);

    useEffect(() => {
        if (sucursalId) {
            if (barberos.length > 0 && !formData.barbero.barberoId) {
                setFormData((prevData) => ({
                    ...prevData,
                    barbero : {barberoId: data?.barbero?.barberoId || barberos[0].barberoId}
                }));
            }
            if (servicios.length > 0 && !formData.servicio.servicioId) {
                setFormData((prevData) => ({
                    ...prevData,
                    servicio : {servicioId: data?.servicio?.servicioId || servicios[0].servicioId}
                }));
            }
        }
    }, [sucursalId, barberos, servicios, data]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            sucursal: name === 'idSucursal' ? {sucursalId: value} : prevData.sucursal
        }));
        if (name === 'idSucursal') {
            setSucursalId(value);
        }
        console.log(formData);
    };

    const handleSubmit = () => {
        console.log(formData);
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? 'Editar Cita' : 'Agregar Cita'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group controlId={`formFechaHora`}>
                            <div>Fecha y Hora</div>
                            <Form.Control
                                type='datetime-local'
                                name='fechaHora'
                                value={formData.fechaHora || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId={`formSucursal`}>
                            <div>Sucursal</div>
                            <Form.Control
                                as="select"
                                name='idSucursal'
                                value={formData.sucursal.sucursalId || ''}
                                onChange={handleChange}
                            >
                                {sucursales.map((sucursal) => (
                                    <option key={sucursal.sucursalId}
                                            value={sucursal.sucursalId}>{sucursal.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId={`formServicio`}>
                            <div>Servicio</div>
                            <Form.Control
                                as="select"
                                name='idServicio'
                                value={formData.servicio.servicioId || ''}
                                onChange={handleChange}
                            >
                                {servicios.map((servicio) => (
                                    <option key={servicio.servicioId}
                                            value={servicio.servicioId}>{servicio.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId={`formBarbero`}>
                            <div>Barbero</div>
                            <Form.Control
                                as="select"
                                name='idbarbero'
                                value={formData.barbero.barberoId || ''}
                                onChange={handleChange}
                            >
                                {barberos.map((barbero) => (
                                    <option key={barbero.barberoId} value={barbero.barberoId}>{barbero.nombre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleSubmit}>
                    Guardar
                </Button>
                <Button variant="light" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAgregarCita;