import TablaCitasComponent from "../Componentes/TablaCitasComponent";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Citas() {
    return (
        <div>
            <Row>
                <Col>
                    <h1>Agenda de Citas</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TablaCitasComponent/>
                </Col>
            </Row>
            <Row>
                <Col className={"text-center py-5"}>
                    <Link className={"btn btn-dark btn-lg"} to={"/citas/agregar"}>Agregar Cita</Link>
                </Col>
            </Row>
        </div>
    );
}

export default Citas;