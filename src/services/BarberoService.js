import axios from "axios";

// URL base de la API
const URL_BASE = "http://localhost:8090/api/barbero";

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

class BarberoServicio {

    async findAll() {
        return axios.get(URL_BASE);
    }

    create(barbero) {
        return axios.post(URL_BASE, barbero);
    }

    findById(idBarbero) {
        return axios.get(`${URL_BASE}/${idBarbero}`);
    }

    findBySucursalId(sucursalId) {
        return axios.get(`${URL_BASE}/sucursal/${sucursalId}`);
    }

    update(idBarbero, barbero) {
        return axios.put(`${URL_BASE}/${idBarbero}`, barbero);
    }

    delete(idBarbero) {
        return axios.delete(`${URL_BASE}/${idBarbero}`);
    }

}

// Exporta una nueva instancia de UsuarioServicio
export default new BarberoServicio();