import axios from "axios";

// URL base de la API
const URL_BASE = "http://localhost:8090/api/sucursal";


class SucursalServicio {

    async findAll() {
        return axios.get(URL_BASE);
    }

    create(sucursal) {
        return axios.post(URL_BASE, sucursal);
    }

    findById(idSucursal) {
        return axios.get(`${URL_BASE}/${idSucursal}`);
    }

    update(idSucursal, sucursal) {
        return axios.put(`${URL_BASE}/${idSucursal}`, sucursal);
    }

    delete(idSucursal) {
        return axios.delete(`${URL_BASE}/${idSucursal}`);
    }

    login(sucursal) {
        return axios.post(`${URL_BASE}/login`, sucursal);
    }
}

// Exporta una nueva instancia de sucursalServicio
export default new SucursalServicio();