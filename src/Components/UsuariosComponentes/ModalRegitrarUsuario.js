import { useEffect, useState } from "react";
import useUsuario from "../../hooks/useUsuario";
import useBarbero from "../../hooks/useBarbero";
import useSucursal from "../../hooks/useSucursal";
import { Modal } from "react-bootstrap";

const ModalRegitrarUsuario = ({ show, handleClose, handleSave }) => {
    const [sucursalId, setSucursalId] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasennia, setContrasennia] = useState('');
    const [tipo, setTipo] = useState('CLIENTE');
    const [successMessage, setSuccessMessage] = useState('');
    const { createUsuario, loading: loadingUsuario } = useUsuario();
    const { createBarbero, loading: loadingBarbero } = useBarbero();
    const { sucursales, loading: loadingSucursal, error: errorSucursal } = useSucursal();

    useEffect(() => {
        if (tipo === 'BARBERO' && sucursales.length > 0 && !sucursalId) {
            setSucursalId(sucursales[0].sucursalId);
        }
    }, [sucursales, tipo]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        if (tipo === 'CLIENTE') {
            await createUsuario(nombre, correo, contrasennia, tipo);
        } else {
            await createUsuario(nombre, correo, contrasennia, tipo);
            await createBarbero(nombre, sucursalId);
        }
        setSuccessMessage('Usuario registrado con éxito');
        handleSave();
    }

    return (
        <Modal show={show} onHide={handleClose} style={{ maxWidth: '100%', maxHeight: '110%' }}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form>
                    <div className="form-group">
                        <div>Nombre</div>
                        <input
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div>Correo</div>
                        <input
                            type="email"
                            className="form-control"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div>Contraseña</div>
                        <input
                            type="password"
                            className="form-control"
                            value={contrasennia}
                            onChange={(e) => setContrasennia(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div>Tipo</div>
                        <select
                            className="form-control"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                        >
                            <option value="CLIENTE">Cliente</option>
                            <option value="BARBERO">Barbero</option>
                        </select>
                    </div>
                    {tipo === 'BARBERO' && (
                        <div className="form-group">
                            <div>Sucursal</div>
                            <select
                                className="form-control"
                                value={sucursalId}
                                onChange={(e) => setSucursalId(e.target.value)}
                                required
                            >
                                {loadingSucursal ? (
                                    <option>Cargando...</option>
                                ) : errorSucursal ? (
                                    <option>Error</option>
                                ) : (
                                    sucursales.map(sucursal => (
                                        <option key={sucursal.sucursalId} value={sucursal.sucursalId}>
                                            {sucursal.nombre}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}
                    <div className="form-group mt-3 text-center">
                        <button type="submit" className="btn btn-dark" onClick={onSubmit}>
                            Guardar</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegitrarUsuario;