## Configuración inicial

1. Clona este repositorio usando git clone de preferencia plox
2. Ejecuta `npm install` sino no te va funcar papito xD
3. Inicia el proyecto con `npm start`

## Características principales

- Integración con React
- Servicios de API MapacheBig
- Manejo de estado global con Context API
- Navegación con React Router Dom

## Uso de servicios

Para hacer uso de los servicios, es necesario activar el API MapacheBig. Una vez activada, puedes usar los hooks personalizados como `useUsuario` para interactuar con la API.

### Creación de hooks personalizados

Se recomienda crear hooks personalizados para cada servicio que necesites. Puedes utilizar la IA de tu gusto. Claudia no falla ;)

Ejemplo de estructura para un hook personalizado:

```javascript
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useUsuario = () => {
  const [usuario, setUsuario] = useState(null);

  const fetchUsuario = async (id) => {
    const response = await api.get(`/usuario/${id}`);
    setUsuario(response.data);
  };

  return { usuario, fetchUsuario };

  //Basicamente lo que vimos con el Doc pero ya en su clase y bien ordenado xD
};
```

## Context API

El Context API se utiliza para mantener un estado global en la aplicación. Por ejemplo, puedes guardar información del usuario una vez que inicie sesión. La implementación completa está en proceso y requiere modificaciones en `app.js`.
Nomas esperenme tantito xD pero eso es util, asi para que el barbero le aparezcan unas cosas y a los usuarios otras ✌️
## Agregando componentes

Para agregar el código HTML correspondiente a tu parte del proyecto:

1. Abre el archivo `app.js`
2. Localiza el componente que te toco y eso
3. Agrega tu código HTML dentro de un `<div>` en la ubicación
```jsx
function Gallery() {

    //Aqui las constantes, los hooks declarados y esas cosas bonitas :D
    
    return (
        <div>
            <h1>AQUI TU HTML XD</h1>
        </div>
    );
}

export default Gallery;
```

## Navegación

Para la navegación entre diferentes vistas de la aplicación, se utiliza React Router Dom. Asegúrate de IMPORTAR los componentes que vayas a usar :D;

Ejemplito

```jsx
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Gallery from "./Components/Gallery/Gallery";
import Services from "./Components/Home/Services";
import Schedule from "./Components/Home/Citas";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className={"App"}>
                <Header/>
                <div className={"content"}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/galeria" element={<Gallery/>}/>
                        <Route path="/servicios" element={<Services/>}/>
                        <Route path="/agenda" element={<Schedule/>}/>
                        //Colocas la ruta necesaria NO OLVIDES EL PATH XD
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
```
