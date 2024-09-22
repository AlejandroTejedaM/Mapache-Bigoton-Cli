import axios from "axios";

// URL base de la API
const URL_BASE = "http:localhost:8080/usuario";

class UsuarioServicio {

    async findAll() {
        return axios.get(URL_BASE);
    }

    create(usuario) {
        return axios.post(URL_BASE, usuario);
    }

    findById(idUsuario) {
        return axios.get(URL_BASE + '/' + idUsuario);
    }

    update(idUsuario, usuario) {
        return axios.put(URL_BASE + '/' + idUsuario, usuario);
    }

    delete(idUsuario) {
        return axios.delete(URL_BASE + '/' + idUsuario);
    }

    login(usuario) {
        return axios.post(URL_BASE + '/login', usuario);
    }
}

// Exporta una nueva instancia de PagoServicio
export default new UsuarioServicio()