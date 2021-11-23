function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({
            message: "Unauthorized access"
        })
    }
}

export default isAuthenticated