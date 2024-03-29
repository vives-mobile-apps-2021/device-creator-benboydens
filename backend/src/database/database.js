import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url));

// check if data directory exists
const data_dir = join(__dirname, '../../data')
if (!fs.existsSync(data_dir)) {
    console.log("Created new directory Data");
    fs.mkdirSync(data_dir);
}

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

const connect = async () => {
    await db.read()
    db.data = db.data || { devices: [], users: [] }
};

const Devices = {
    next_id: () => {
        const id = Math.max(...db.data.devices.map(d => d.id), -1);
        return id + 1;
    },

    all: () => {
        return db.data.devices
    },

    create: (device) => {
        const new_device = {
            id: Devices.next_id(),
            name: device.name,
            description: device.description,
            guid: device.guid,
            location: device.location,
            image: device.image || undefined
        };

        db.data.devices.push(new_device);

        return new Promise((resolve, reject) => {
            db.write()
                .then(() => resolve(new_device))
                .catch(() => reject({}))
        });
    },

    get_by_id: (id) => {
        id = parseInt(id);
        return db.data.devices.find(dev => dev.id === id);
    }
};

const Users = {
    next_id: () => {
        const id = Math.max(...db.data.users.map(d => d.id), -1);
        return id + 1;
    },
    create: (email, password, firstname, lastname, avatar) => {
        const new_user = {
            id: Users.next_id(),
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            avatar: avatar
        }

        db.data.users.push(new_user);

        return new Promise((resolve, reject) => {
            db.write()
                .then(() => resolve(new_user))
                .catch(() => reject({}))
        })
    },
    find_by_id: (id) => {
        id = parseInt(id);
        return db.data.users.find(user => user.id === id);
    },
    find_by_email: (email) => {
        return db.data.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }
}

export { connect, Devices, Users }