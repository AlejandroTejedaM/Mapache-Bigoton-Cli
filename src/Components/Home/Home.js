import React from 'react';
import ImagenPrincipal from '../../assets/img/Background.png';

function Home() {
    return (
        <div>
            <img src={ImagenPrincipal} alt="Imagen Principal" className="main-image"/>
        </div>
    );
}

export default Home;