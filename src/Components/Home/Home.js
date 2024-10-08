import React from 'react';
import ImagenPrincipal from '../../assets/img/Background.png';
import {Button} from "react-bootstrap";

function Home() {
    return (
        <div className={"background"}>
            <div>
                <h1 className={"titulo"}>Bienvenido a la página principal</h1>
                <div className={"boton text-center"}>
                    <Button className="btn btn-dark btn-lg text-center" href={"/agenda"}>Agendar cita</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;