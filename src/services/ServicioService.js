import axios  from "axios";

const URL_BASE = "http://localhost:8090/api/servicio";

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

    create(servicio) {
        return axios.post(URL_BASE, servicio);
    }

    findById(idServicio) {
        return axios.get(`${URL_BASE}/${idServicio}`);
    }

    findBySucursalId(sucursalId) {
        return axios.get(`${URL_BASE}/sucursal/${sucursalId}`);
    }

    update(idServicio, servicio) {
        return axios.put(`${URL_BASE}/${idServicio}`, servicio);
    }

    delete(idServicio) {
        return axios.delete(`${URL_BASE}/${idServicio}`);
    }

}

export default new ServicioService();