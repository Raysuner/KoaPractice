const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const userRouter = require("../router/user_router")
const loginRouter = require("../router/auth_router")
const { errorHandler } = require("./error_handler")

const app = new Koa()

app.use(bodyparser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // 判断请求方式是否被允许
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

app.on("error", errorHandler)

module.exports = app