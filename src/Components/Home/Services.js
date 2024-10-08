import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalAgregarServicio from '../Componentes/ModalAgregarServicio';
import TablaServiciosComponent from '../Componentes/TablaServiciosComponent';
import useServicio from '../../hooks/useServicio';

function Servicios() {
    const [showModal, setShowModal] = useState(false);
    const [currentServicio, setCurrentServicio] = useState(null);
    const { servicios, loading, error, createServicio, updateServicio } = useServicio();

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
        console.log(servicio);
        if (servicio.servicioId) {
            console.log("Actualizando servicio");
            await updateServicio(servicio.servicioId, servicio);
        }else{
            console.log("Creando servicio");
            await createServicio(servicio);
        }
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
    }
    
    return (
        <div>
            <Row>
                <Col>
                    <h1>Servicios de Barberia</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaServiciosComponent servicios={servicios} loading={loading} error={error} onEditServicio={handleEditServicio} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-5">
                    <Button className="btn btn-dark btn-lg" onClick={handleAddServicio}>Agregar Servicio</Button>
                </Col>
            </Row>
            <ModalAgregarServicio
                show={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
                data={currentServicio}
            />
        </div>
    );
}

export default Servicios;


















/*function Services() {
    return (
        <div>
            <div className="section">
                <h2>Barbería</h2>
                <table className="services-table">
                    <tr>
                        <td>Recorte de barba</td>
                        <td>$ 250.00</td>
                    </tr>
                    <tr>
                        <td>Arreglo de barba</td>
                        <td>$ 355.00</td>
                    </tr>
                    <tr>
                        <td>Spa de barba</td>
                        <td>$ 550.00</td>
                    </tr>
                    <tr>
                        <td>Rasurado tradicional</td>
                        <td>$ 355.00</td>
                    </tr>
                    <tr>
                        <td>Rasurado spa</td>
                        <td>$ 550.00</td>
                    </tr>
                    <tr>
                        <td>Recorte de bigote sin delineado</td>
                        <td>$ 160.00</td>
                    </tr>
                    <tr>
                        <td>Arreglo de bigote</td>
                        <td>$ 230.00</td>
                    </tr>
                    <tr>
                        <td>Mascarilla negra carbón activado</td>
                        <td>$ 315.00</td>
                    </tr>
                    <tr>
                        <td>Recorte de ceja</td>
                        <td>$ 130.00</td>
                    </tr>
                    <tr>
                        <td>Planchado de ceja</td>
                        <td>$ 305.00</td>
                    </tr>
                    <tr>
                        <td>Rizado de pestañas</td>
                        <td>$ 340.00</td>
                    </tr>
                    <tr>
                        <td>Rizado de pestañas con tinte</td>
                        <td>$ 420.00</td>
                    </tr>
                    <tr>
                        <td>Tratamiento de crecimiento de barba y bigote</td>
                        <td>$ 600.00</td>
                    </tr>
                    <tr>
                        <td>4 sesiones semanales de tratamiento de crecimiento de barba</td>
                        <td>$ 2,100.00</td>
                    </tr>
                </table>
            </div>
            <div className="section">
                <h2>Peluquería</h2>
                <table className="services-table">
                    <tr>
                        <td>Corte de cabello old school</td>
                        <td>$250.00</td>
                    </tr>
                    <tr>
                        <td>Delineado de corte</td>
                        <td>$150.00</td>
                    </tr>
                    <tr>
                        <td>Spa de cabello</td>
                        <td>$630.00</td>
                    </tr>
                    <tr>
                        <td>Corte de cabello niños (12 años)</td>
                        <td>$200.00</td>
                    </tr>
                </table>
            </div>
            <div className="section">
                <h2>SPA</h2>
                <table className="services-table">
                    <h3>Tratamientos faciales</h3>
                    <tr>
                        <td><strong>Básicos:</strong></td>
                    </tr>
                    <tr>
                        <td>Mascarilla negra (carbón activado)</td>
                        <td>$ 299.00</td>
                    </tr>
                    <tr>
                        <td>Facial de limpieza profunda</td>
                        <td>$ 945.00</td>
                    </tr>
                    <tr>
                        <td>Facial hidratante</td>
                        <td>$ 945.00</td>
                    </tr>
                    <tr>
                        <td><strong>Tratamientos anti edad:</strong></td>
                    </tr>
                    <tr>
                        <td>Facial de contorno de ojos</td>
                        <td>$ 920.00</td>
                    </tr>
                    <tr>
                        <td>Facial de colágeno y elastina</td>
                        <td>$ 1,100.00</td>
                    </tr>
                    <tr>
                        <td>Facial líneas de expresión con luz pulsada intensa</td>
                        <td>$ 1,200.00</td>
                    </tr>
                    <tr>
                        <td>Peeling cosmético</td>
                        <td>$ 1,200.00</td>
                    </tr>
                    <tr>
                        <td><strong>Tratamientos especiales:</strong></td>
                    </tr>
                    <tr>
                        <td>Chocoterapia facial</td>
                        <td>$ 1,050.00</td>
                    </tr>
                    <tr>
                        <td>Facial anti acné</td>
                        <td>$ 1,050.00</td>
                    </tr>
                    <tr>
                        <td>Facial despigmentante luz pulsada intensa</td>
                        <td>$ 1,200.00</td>
                    </tr>
                    <tr>
                        <td>Facial de piedras calientes</td>
                        <td>$ 1,200.00</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Services;*/