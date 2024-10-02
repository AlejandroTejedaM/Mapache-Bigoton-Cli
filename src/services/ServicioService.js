import axios from "axios";
//URL Base de la API
const URL_BASE = "http://localhost:8080/api/servicio";

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

class ServicioService {
    async findAll() {
        return axios.get(URL_BASE);
    }

    create(servicio){
        return axios.post(URL_BASE, servicio);
    }

    findById(servicioId) {
        return axios.get(`${URL_BASE}/${servicioId}`);
    }

    update(servicioId, servicio) {
        return axios.put(`${URL_BASE}/${servicioId}`, servicio);
    }

    async delete(servicioId) {
        return axios.delete(`${URL_BASE}/${servicioId}`);
    }
}

//Exporta una nueva instancia de ServiciosService
export default new ServicioService();