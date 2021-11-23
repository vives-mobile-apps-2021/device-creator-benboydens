const userRoute = {
    register: (req, res, next) => {
        res.send("Register");
    },
    login: (req, res, next) => {
        res.send("Login");
    },
    logout: (req, res, next) => {
        res.send("Logout");
    }
}

export default userRoute