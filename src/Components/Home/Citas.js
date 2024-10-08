import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalAgregarCita from '../CitasComponentes/ModalAgregarCita';
import TablaCitasComponent from '../CitasComponentes/TablaCitasComponent';
import useCitas from '../../hooks/useCitas';

function Citas() {
    const [showModal, setShowModal] = useState(false);
    const [currentCita, setCurrentCita] = useState(null);
    const { citas, loading, error, createCita, updateCita, fetchCitas } = useCitas();
    const [refresh, setRefresh] = useState(0);

    const handleAddCita = () => {
        setCurrentCita(null);
        setShowModal(true);
    };

    const handleEditCita = (cita) => {
        console.log("Editando cita");
        setCurrentCita(cita);
        setShowModal(true);
    };

    const handleSave = async (cita) => {
        console.log(cita);
        if (cita.citaId) {
            console.log("Actualizando cita");
            await updateCita(cita.citaId, cita);
        }else{
            console.log("Creando cita");
            await createCita(cita);
        }
        setShowModal(false);
        setRefresh(prev => prev + 1);
    };

    const handleClose = () => {
        setShowModal(false);
        setRefresh(prev => prev + 1);
    }

    useEffect( () => {
        async function fetchData() {
            await fetchCitas();
        }
    }, [refresh]);

    return (
        <div>
            <Row>
                <Col>
                    <h1>Agenda de Citas</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaCitasComponent citas={citas} loading={loading} error={error} onEditCita={handleEditCita} refresh={refresh} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-5">
                    <Button className="btn btn-dark btn-lg" onClick={handleAddCita}>Agregar Cita</Button>
                </Col>
            </Row>
            <ModalAgregarCita
                show={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
                data={currentCita}
            />
        </div>
    );
}

export default Citas;