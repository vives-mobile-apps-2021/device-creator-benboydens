import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

const DevicesAPI = {
    resource: 'devices',
    get_all_devices() {
        return api.get(`/${this.resource}`)
    },

    get_one_device(id) {
        return api.get(`/${this.resource}/${id}`)
    },

    create_device(device) {
        return api.post(`/${this.resource}`, device)
    }
}

export { api, DevicesAPI }