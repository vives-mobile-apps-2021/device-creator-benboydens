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
        lastname: user.lastname,
        avatar: user.avatar
    }
}

const userRoute = {
    profile: (req, res, next) => {
        if (req.user) {
            res.send(sanitize_user(req.user));
        } else {
            res.status(401).send({message: "Unauthorized access."})
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

        // check if user email already exists
        const user_check = Users.find_by_email(req.body.email);
        if (user_check) {
            // email already in use
            res.status(400).send({ message: "Email already in use" })
            return;
        }

        bcrypt.hash(req.body.password, 10)
            .then((hashedPassword) => {
                return Users.create(req.body.email, hashedPassword, req.body.firstname, req.body.lastname, req.body.avatar);
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
                details: validation.errors.map(e => e.stack)
            });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) return res.status(500).send({ message: "User authentication failed" });
            if (!user) return res.status(400).send({ message: "Credentials invalid" });

            console.log("User found and logging in");
            req.login(user, (err) => {
                if (err) return res.status(500).send({ message: "Login action failed" });

                res.send(sanitize_user(user));
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