import axios from "axios";

// URL base de la API
const URL_BASE = "http://localhost:8090/api/usuario";

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

class UsuarioServicio {

    async findAll() {
        return axios.get(URL_BASE);
    }

    create(usuario) {
        return axios.post(URL_BASE, usuario);
    }

    findById(idUsuario) {
        return axios.get(`${URL_BASE}/${idUsuario}`);
    }

    update(idUsuario, usuario) {
        return axios.put(`${URL_BASE}/${idUsuario}`, usuario);
    }

    delete(idUsuario) {
        return axios.delete(`${URL_BASE}/${idUsuario}`);
    }

    login(usuario) {
        return axios.post(`${URL_BASE}/login`, usuario);
    }

    findyByCorreo(correo){
        return axios.get(`${URL_BASE}/correo/${correo}`);
    }
}

// Exporta una nueva instancia de UsuarioServicio
export default new UsuarioServicio();