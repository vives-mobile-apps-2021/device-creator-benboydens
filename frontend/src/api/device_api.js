import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5000'
})

const Devices = {
    resource: 'devices',
    get_all_devices() {
        console.log(`Getting all devices`)
        return api.get(`/${this.resource}`)
    },

    get_one_device(id) {
        console.log(`Getting 1 device with id: ${id}`)
        return api.get(`/${this.resource}/${id}`)
    },

    create_device(name) {
        console.log(`Creating device with name ${name}`)
        api.post(`/${this.resource}`, {
            name: name
        })
    }
}

export { api, Devices }