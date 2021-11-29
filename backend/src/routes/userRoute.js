import { Users } from "../database/database.js";
import { AuthenticationSchema } from "../validation/authentication.js";
import { validate } from "jsonschema";
import passport from "passport";
import bcrypt from 'bcrypt';

function sanitize_user(user) {
    return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    }
}

const userRoute = {
    get: (req, res, next) => {
        let id = req.params.id;
        const user = Users.find_by_id(id);

        if (user) {
            res.send(sanitize_user(user));
        } else {
            res.status(404).send({ message: `User with id ${id} not found.` })
        }
    },
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
        bcrypt.hash(req.body.password, 10)
            .then((hashedPassword) => {
                return Users.create(req.body.email, hashedPassword, req.body.firstname, req.body.lastname);
            })
            .then((user) => {
                res.status(201).send(sanitize_user(user));
            })
            .catch(() => {
                res.status(500).send({
                    message: "Failed to write to database."
                })
            })
    },
    login: (req, res, next) => {
        // Validation
        const validation = validate(req.body, AuthenticationSchema.login);
        if (!validation.valid) {
            return res.status(400).send({
                message: 'Invalid user information',
                errors: validation.errors.map(e => e.stack)
            });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) return res.status(500).send({ message: "User authentication failed" });
            if (!user) return res.status(400).send({ message: "Credentials invalid" });

            console.log("User found and logging in");
            req.login(user, (err) => {
                if (err) return res.status(500).send({ message: "Login action failed" });

                res.send(user);
            })
        })(req, res)    // Middleware
    },
    logout: (req, res, next) => {
        req.logOut();
        res.send({
            message: "Successfully logged out"
        })
    }
}

export default userRoute