import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));


const imageRoute = {
    get: (req, res, next) => {
        let filename = req.params.id;
        let options = {
            root: join(__dirname, '../../uploads'),
        }
        res.sendFile(filename, options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent:', filename)
            }
        });
    },
    post: (req, res, next) => {
        // TODO add extra checks
        console.log("File: ", req.file);
        console.log("Body: ", req.body);
        res.status(201).send({
            "filename": req.file.filename
        });
    }
}

export default imageRoute;