const AuthenticationSchema = {
    register: {
        type: "object",
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" }
        },
        required: ["email", "password", "firstname", "lastname"],
        additionalProperties: false
    },
    login: {
        type: "object",
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" }
        },
        required: ["email", "password"],
        additionalProperties: false
    }
}

export { AuthenticationSchema }