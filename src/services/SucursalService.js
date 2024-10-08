import axios from "axios";

// URL base de la API
const URL_BASE = "http://localhost:8090/api/sucursal";

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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

}

// Exporta una nueva instancia de UsuarioServicio
export default new SucursalServicio();