var devices = [
    { id: 0, name: 'benboydens' },
    { id: 1, email: 'mydevice' }
];

function list(req, res, next) {
    res.json(devices);
}

function load(req, res, next) {
    let id = req.params.id;
    req.device = devices[id];
    if (req.device) {
        next();
      } else {
        var err = new Error('cannot find user ' + id);
        err.status = 404;
        next(err);
      }
}

function get(req, res) {
    res.json(req.device);
}

function create(req, res) {
    res.send("CREATE")
}

export { list, load, get, create }