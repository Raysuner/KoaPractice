const jwt = require("jsonwebtoken")
const { PUBLIC_KEY } = require("../app/config")
const errorType = require("../app/error_types")
const userService = require("../service/user_service")
const encryption = require("../utils/encryption")

const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // console.log(name, password)

    if (!name || !password) {
        const error = new Error(errorType.USERNAME_AND_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }

    const result = await userService.getUserByName(name)
    const user = result[0]
    // console.log(user)

    if (!user) {
        const error = new Error(errorType.USER_NOT_EXIST)
        return ctx.app.emit("error", error, ctx)
    }

    if (encryption.encryptionPassword(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_NOT_CORRECT)
        return ctx.app.emit("error", error, ctx)
    }

    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    // 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace("Bearer ", "")
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit("error", error, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
}