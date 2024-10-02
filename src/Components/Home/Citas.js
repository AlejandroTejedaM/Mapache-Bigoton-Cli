import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalAgregarCita from '../CitasComponentes/ModalAgregarCita';
import TablaCitasComponent from '../CitasComponentes/TablaCitasComponent';
import useCitas from '../../hooks/useCitas';

function Citas() {
    const [showModal, setShowModal] = useState(false);
    const [currentCita, setCurrentCita] = useState(null);
    const { citas, loading, error, createCita, updateCita, fetchCitas } = useCitas();
    const navigate = useNavigate();

    const handleAddCita = () => {
        setCurrentCita(null);
        setShowModal(true);
    };

    const handleEditCita = (cita) => {
        setCurrentCita(cita);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        if (currentCita) {
            await updateCita(currentCita.citaId, formData.fechaHora, formData.idServicio, formData.idusuario, formData.idbarbero);
        } else {
            await createCita(formData.fechaHora, formData.idServicio, formData.idusuario, formData.idbarbero);
        }
        /*
         const [formData, setFormData] = useState({
        fechaHora: data ? format(new Date(data.fechaHora), 'yyyy-MM-dd\'T\'HH:mm') : '',
        sucursal: {sucursalId: data?.servicio?.sucursal?.sucursalId || ''},
        servicio: {servicioId:  data?.servicio?.servicioId || ''},
        barbero : {barberoId: data?.barbero?.barberoId || ''},
        user : {idusuario: usuario.usuarioId},
        cita : {citaId: data?.citaId || null}
    });

         */
        await fetchCitas();
        setShowModal(false);
        navigate(0); // Refresh the page
    };

    return (
        <div>
            <Row>
                <Col>
                    <h1>Agenda de Citas</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaCitasComponent citas={citas} loading={loading} error={error} onEditCita={handleEditCita} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-5">
                    <Button className="btn btn-dark btn-lg" onClick={handleAddCita}>Agregar Cita</Button>
                </Col>
            </Row>
            <ModalAgregarCita
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                data={currentCita}
            />
        </div>
    );
}

export default Citas;