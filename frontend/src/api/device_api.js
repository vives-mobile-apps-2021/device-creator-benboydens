import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
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

const ImageAPI = {
    resource: 'images',
    upload_image(file) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('image', file); // name 'image' has to be the same as in the backend for multer!!!
        return api.post(`/${this.resource}/upload`, formData, config);
    }
}

const UserAPI = {
    register(email, password) {
        const new_user = {
            email: email,
            password: password
        }
        return api.post('/register', new_user);
    },
    login(email, password) {
        const user = {
            email: email,
            password: password
        }
        return api.post('/login', user);
    },
    logout() {
        return api.delete('/logout');
    }
}

export { api, DevicesAPI, ImageAPI, UserAPI }