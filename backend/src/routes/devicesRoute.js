import { Devices } from '../database/database.js'


function list(req, res, next) {
    res.send(Devices.all());
}

function load(req, res, next) {
    let id = req.params.id;
    req.device = Devices.get_by_id(id);
    if (req.device) {
        next();
    } else {
        var err = new Error('cannot find device ' + id);
        err.status = 404;
        next(err);
    }
}

function get(req, res) {
    res.send(req.device);
}

function post(req, res) {
    Devices.create(req.body.name)
        .then((device) => {
            res.status(201).send(device);
        })
        .catch(() => {
            res.status(500).send({
                message: "Failed to write to database."
            })
        })
}

export { list, load, get, post }