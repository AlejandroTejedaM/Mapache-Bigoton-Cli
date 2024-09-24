import React from 'react';
import ImagenPrincipal from '../../assets/img/Background.png';

function Home() {
    return (
        <div>
            <img src={ImagenPrincipal} alt="Imagen Principal" className="d-block w-100"/>
        </div>
    );
}

export default Home;