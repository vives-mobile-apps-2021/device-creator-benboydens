import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "../database/database.js";
import bcrypt from 'bcrypt';

function initialize(passport) {

    // (2) Function that wil authenticate the user
    // Done should be called with user
    const authenticateUser = (email, password, done) => {
        const user = Users.find_by_email(email);
        if (!user) return done(null, false, { message: "Could not find user" });

        // checkpassword
        bcrypt.compare(password, user.password)
            .then((result) => {
                if (!result) return done(null, false, { message: "Password did not match" })
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            })
    }

    // (1) Setup local authentication
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: "password" // default
    }, authenticateUser))

    // (3) Serialize user into a session
    passport.serializeUser((user, done) => {
        console.log("Serializing user into session");
        return done(null, user.id);
    })

    // (4) Deserialize user from session
    passport.deserializeUser((id, done) => {
        console.log("Deserialize user from id");
        return done(null, Users.find_by_id(id));
    })
}

export default initialize;