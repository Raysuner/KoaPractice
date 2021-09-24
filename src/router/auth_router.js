const Router = require("koa-router")
const authController = require("../controller/auth_controller")

const router = new Router({prefix: "/login"})

router.post(
    "/",

    authController.login
)

module.exports = router