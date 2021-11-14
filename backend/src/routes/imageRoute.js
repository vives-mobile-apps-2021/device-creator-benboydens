const imageRoute = {
    post: (req, res, next) => {
        console.log("File: ", req.file);
        console.log("Body: ", req.body);
        res.status(201).send({
            "filename": req.file.filename
        });
    }
}

export default imageRoute;