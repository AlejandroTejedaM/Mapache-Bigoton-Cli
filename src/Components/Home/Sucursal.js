import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModalAgregarSucursal from '../SucursalComponentes/ModalAgregarSucursal';
import TablaSucursalesComponent from '../SucursalComponentes/TablaSucursalesComponent';
import useSucursales from '../../hooks/useSucursal';

const Sucursal = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentSucursal, setCurrentSucursal] = useState(null);
    const { sucursales, loading, error, addSucursal, editSucursal } = useSucursales();
    const navigate = () => window.location.reload();
    const handleAddSucursal = () => {
        setCurrentSucursal(null);
        setShowModal(true);
    };

    const handleEditSucursal = (sucursal) => {
        setCurrentSucursal(sucursal);
        setShowModal(true);
    };

    const handleSave = async (sucursal) => {
        if (sucursal.sucursalId) {
            await editSucursal(sucursal.sucursalId, sucursal);
        } else {
            await addSucursal(sucursal);
        }
        setShowModal(false);
        navigate(0);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Row>
                <Col>
                    <h1>Gestionar Sucursales</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaSucursalesComponent
                        sucursales={sucursales}
                        loading={loading}
                        error={error}
                        onEditSucursal={handleEditSucursal}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-5">
                    <Button className="btn btn-dark btn-lg" onClick={handleAddSucursal}>Agregar Sucursal</Button>
                </Col>
            </Row>
            <ModalAgregarSucursal
                show={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
                data={currentSucursal}
            />
        </div>
    );
};

export default Sucursal;
