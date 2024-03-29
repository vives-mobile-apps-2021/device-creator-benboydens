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
        return api.get(`/${this.resource}/${id}`, { withCredentials: true })
    },

    create_device(device) {
        return api.post(`/${this.resource}`, device, { withCredentials: true })
    }
}

const ImageAPI = {
    resource: 'images',
    upload_image(file) {
        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('image', file); // name 'image' has to be the same as in the backend for multer!!!
        return api.post(`/${this.resource}/upload`, formData, config);
    }
}

const AvatarAPI = {
    resource: 'avatars',
    upload_avatar(file) {
        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData();
        formData.append('image', file); // name 'image' has to be the same as in the backend for multer!!!
        return api.post(`/${this.resource}`, formData, config);
    }
}

const UserAPI = {
    register(new_user) {
        return api.post('/register', new_user);
    },
    login(email, password) {
        const user = {
            email: email,
            password: password
        }
        return api.post('/login', user, { withCredentials: true });
    },
    logout() {
        return api.delete('/logout', { withCredentials: true });
    },
    get_profile() {
        return api.get(`/profile`, { withCredentials: true });
    }
}

export { api, DevicesAPI, ImageAPI, UserAPI, AvatarAPI }