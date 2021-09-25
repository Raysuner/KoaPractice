const errorType = require('./error_types')

function errorHandler(error, ctx) {
    let status, message
    switch (error.message) {
        case errorType.USERNAME_AND_PASSWORD_IS_REQUIRED:
            status = 400
            message = "账号或密码未填写"
            break
        case errorType.USER_ALREADY_EXIST:
            status = 409
            message = "用户已经存在"
            break
        case errorType.USER_NOT_EXIST:
            status = 400
            message = "用户不存在"
            break
        case errorType.PASSWORD_IS_NOT_CORRECT:
            status = 400
            message = "密码不正确"
            break
        case errorType.UNAUTHORIZATION:
            status = 401
            message = "未授权"
            break
        default:
            status = 404
            message = "默认错误"
    }
    ctx.status = status
    ctx.body = message
}

module.exports = {
    errorHandler,
}