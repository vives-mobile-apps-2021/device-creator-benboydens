import { Users } from "../database/database.js";
import { AuthenticationSchema } from "../validation/authentication.js";
import { validate } from "jsonschema";

const userRoute = {
    register: (req, res, next) => {
        // validation
        const validation = validate(req.body, AuthenticationSchema.register);
        if (!validation.valid) {
            res.status(400).send({
                message: 'JSON Validation failed',
                details: validation.errors.map(e => e.message)
            });
            return;
        }
        Users.create(req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch(() => {
                res.status(500).send({
                    message: "Failed to write to database."
                })
            })
    },
    login: (req, res, next) => {
        // validation
        const validation = validate(req.body, AuthenticationSchema.login);
        if (!validation.valid) {
            res.status(400).send({
                message: 'JSON Validation failed',
                details: validation.errors.map(e => e.message)
            });
            return;
        }
        res.send("Login")
    },
    logout: (req, res, next) => {
        res.send("Logout");
    }
}

export default userRoute