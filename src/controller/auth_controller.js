class AuthController {
    async login(ctx, next) {
        const { name } = ctx.request.body
        console.log(`welcome back ${name}`)
    }
}

module.exports = new AuthController()