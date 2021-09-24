const Router = require("koa-router")
const userController = require("../controller/user_controller")
const userMiddleware = require("../middleware/user_middleware")

const router = new Router({prefix: '/user'})

router.post(
    "/",
    userMiddleware.verifyUser,
    userMiddleware.handlePassword,
    userController.createUser
)

module.exports = router