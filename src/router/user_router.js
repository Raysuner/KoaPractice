const Router = require("koa-router")

const {
    createUser
} = require("../controller/user_controller")

const {
    verifyUser,
    handlePassword
} = require("../middleware/user_middleware")

const userRouter = new Router()

userRouter.post(
    "/user",
    verifyUser,
    handlePassword,
    createUser
)

module.exports = userRouter