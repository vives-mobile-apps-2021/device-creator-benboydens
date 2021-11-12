import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

const connect = async () => {
    await db.read()
    db.data = db.data || { devices: [] }
};

const Devices = {
    next_id: () => {
        const id = Math.max(...db.data.devices.map(d => d.id))
        return (id || 0) + 1;
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
        return db.data.devices[id];
    }
};

export { connect, Devices }