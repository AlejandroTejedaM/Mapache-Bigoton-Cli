import React, {useState, useEffect, useContext} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import UsuarioContext from '../../context/UsuarioContext';
import useBarbero from '../../hooks/useBarbero';
import useServicio from '../../hooks/useServicio';
import useSucursal from "../../hooks/useSucursal";
import {format} from "date-fns";

const ModalAgregarCita = ({show, handleClose, handleSave, data}) => {
    const {usuario} = useContext(UsuarioContext);
    const {sucursales, loading: loadingSucursal, error: errorSucursal} = useSucursal();
    const [sucursalId, setSucursalId] = useState(data?.servicio?.sucursal?.sucursalId || null);
    const {barberos, loading: loadingBarbero, error: errorBarbero} = useBarbero(sucursalId);
    const {servicios, loading: loadingServicio, error: errorServicio} = useServicio(sucursalId);

    const [formData, setFormData] = useState({
        fechaHora: data ? format(new Date(data.fechaHora), 'yyyy-MM-dd\'T\'HH:mm') : '',
        idsucursal: data?.servicio?.sucursal?.sucursalId || '',
        idServicio: data?.servicio?.servicioId || '',
        idbarbero: data?.barbero?.barberoId || '',
        idusuario: usuario.usuarioId
    });

    useEffect(() => {
        console.log("Sucursales disponibles:", sucursales);
        console.log("Data de cita al editar:", data);

        if (sucursales.length > 0 && !formData.idsucursal) {
            const firstSucursal = sucursales[0].sucursalId;
            setFormData((prevData) => ({
                ...prevData,
                idsucursal: data?.servicio?.sucursal?.sucursalId || firstSucursal
            }));
            setSucursalId(data?.servicio?.sucursal?.sucursalId || firstSucursal);
        }
    }, [sucursales]);

    useEffect(() => {
        console.log("Sucursal seleccionada:", sucursalId);
        console.log("Barberos disponibles:", barberos);
        console.log("Servicios disponibles:", servicios);
        console.log("Data de cita al editar:", data);
        if (sucursalId) {
            if (barberos.length > 0 && !formData.idbarbero) {
                setFormData((prevData) => ({
                    ...prevData,
                    idbarbero: data?.barbero?.barberoId || barberos[0].barberoId
                }));
            }
            if (servicios.length > 0 && !formData.idServicio) {
                setFormData((prevData) => ({
                    ...prevData,
                    idServicio: data?.servicio?.servicioId || servicios[0].servicioId
                }));
            }
        }
    }, [sucursalId, barberos, servicios, data]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(`Cambiando ${name}: ${value}`);
        setFormData({...formData, [name]: value});
        if (name === 'sucursal') {
            setSucursalId(value);
        }
    };

    const handleSubmit = () => {
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
                                name='idsucursal'
                                value={formData.idsucursal || ''}
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
                                value={formData.idServicio || ''}
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
                                value={formData.idbarbero || ''}
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
