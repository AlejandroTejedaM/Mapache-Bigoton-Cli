import axios from "axios";

// URL base de la API
const URL_BASE = "http://localhost:8080/api/citas";

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

class CitaServicio {

    async findAll() {
        return axios.get(URL_BASE);
    }

    async create(cita) {
        return axios.post(URL_BASE, cita);
    }

    async findById(idcita) {
        return axios.get(`${URL_BASE}/${idcita}`);
    }

    async update(idcita, cita) {
        return axios.put(`${URL_BASE}/${idcita}`, cita);
    }

    async delete(idcita) {
        return axios.delete(`${URL_BASE}/${idcita}`);
    }
}

// Exporta una nueva instancia de citaServicio
export default new CitaServicio();