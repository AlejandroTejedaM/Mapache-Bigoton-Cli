// src/Components/ModalConfirmacionGenerico.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmacionGenerico = ({ show, handleClose, handleConfirm, title, message }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmacionGenerico;