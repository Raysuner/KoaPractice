const errorType = require("../app/error_types")
const connections = require("../app/database")

const verifyLogin = (ctx, next) => {
    const { name, password } = ctx.request.body

    if (!name || !password) {
        const error = new Error(errorType.USERNAME_AND_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }

    const statement = `SELECT * FROM users WHERE;`
    connections

    if ()
}