import { validate } from 'jsonschema'
import { Devices } from '../database/database.js'
import { DeviceSchema } from '../validation/deviceValidation.js'


const DeviceRoute = {
    list: (req, res, next) => {
        res.send(Devices.all());
    },

    load: (req, res, next) => {
        let id = req.params.id;
        req.device = Devices.get_by_id(id);
        if (req.device) {
            next();
        } else {
            res.status(404).send({ message: "Device not found" })
        }
    },

    get: (req, res) => {
        res.send(req.device);
    },

    post: (req, res) => {
        // validation
        const validation = validate(req.body, DeviceSchema.create);
        if (!validation.valid) {
            res.status(400).send({
                message: 'JSON Validation failed',
                details: validation.errors.map(e => e.message)
            });
            return;
        }

        // actually create the device in the database
        Devices.create(req.body)
            .then((device) => {
                res.status(201).send(device); // TODO dont send password back
            })
            .catch(() => {
                res.status(500).send({
                    message: "Failed to write to database."
                })
            })
    }
};


export default DeviceRoute;