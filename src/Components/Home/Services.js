import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalAgregarServicio from '../Componentes/ModalAgregarServicio';
import TablaServiciosComponent from '../Componentes/TablaServiciosComponent';
import useServicio from '../../hooks/useServicio';

function Servicios() {
    const [showModal, setShowModal] = useState(false);
    const [currentServicio, setCurrentServicio] = useState(null);
    const { servicios, loading, error, createServicio, updateServicio, fetchServicio} = useServicio();
    const [refresh, setRefresh] = useState(0);
    const handleAddServicio = () => {
        setCurrentServicio(null);
        setShowModal(true);
    };

    const handleEditServicio = (servicio) => {
        console.log("Editando servicio");
        setCurrentServicio(servicio);
        setShowModal(true);
    };

    const handleSave = async (servicio) => {
        if (servicio.servicioId) {
            await updateServicio(servicio.servicioId, servicio);
        }else{
            await createServicio(servicio);
        }
        setShowModal(false);
        setRefresh(prev => prev + 1);
    };

    const handleClose = () => {
        setShowModal(false);
        setRefresh(prev => prev + 1);
    }

    useEffect(() => {
        async function fetchData() {
            await fetchServicio();
        }
    }, [refresh]);
    
    return (
        <div>
            <Row>
                <Col>
                    <h1>Servicios de Barberia</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaServiciosComponent servicios={servicios} loading={loading} error={error} onEditServicio={handleEditServicio} refresh={refresh} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-5">
                    <Button className="btn btn-dark btn-lg" onClick={handleAddServicio}>Agregar Servicio</Button>
                </Col>
            </Row>
            <ModalAgregarServicio
                show={showModal}
                data={currentServicio}
                handleClose={handleClose}
                handleSave={handleSave}
            />
        </div>
    );
}

export default Servicios;