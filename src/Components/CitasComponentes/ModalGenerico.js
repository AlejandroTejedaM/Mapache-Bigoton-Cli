import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row } from 'react-bootstrap';
import { format } from 'date-fns';

const ModalGenerico = ({ show, handleClose, handleSave, data, fields, title }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) {
            const formattedData = fields.reduce((acc, field) => {
                let value = data[field.name];
                if (field.type === 'datetime-local' && value) {
                    value = format(new Date(value), 'yyyy-MM-dd\'T\'HH:mm');
                } else if (typeof value === 'object' && value !== null) {
                    value = value.nombre || ''; // Adjust this based on the actual property you need
                } else {
                    value = value ? String(value) : '';
                }
                acc[field.name] = value;
                return acc;
            }, {});
            setFormData(formattedData);
            console.log(formattedData);
        } else {
            const initialFormData = fields.reduce((acc, field) => {
                acc[field.name] = '';
                return acc;
            }, {});
            setFormData(initialFormData);
        }
    }, [data, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map((field) => (
                        <Row key={field.name} className="mb-3">
                            <Form.Group controlId={`form${field.name}`}>
                                <div>{field.label}</div>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                    ))}
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

export default ModalGenerico;