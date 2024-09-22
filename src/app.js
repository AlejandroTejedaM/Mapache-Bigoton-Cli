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
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;