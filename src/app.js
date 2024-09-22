import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Gallery from "./Components/Gallery/Gallery";
import Services from "./Components/Home/Services";
import Schedule from "./Components/Home/Citas";
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    );
}

export default App;