const commentService = require("../service/comment_service")
const errorType = require("../app/error_types")

class CommentController {
    async createComment(ctx, next) {
        const userId = ctx.user.id
        const content = ctx.request.body.content
        const result = await commentService.createComment(userId, content)
        ctx.body = result[0]
    }

    async getComment(ctx, next) {
        const id = ctx.params.commentId
        const result = await commentService.getComment(id)
        ctx.body = result
    }

    async getCommentList(ctx, next) {
        const offset = ctx.query.offset || String(1)
        const size = ctx.query.size || String(99999)
        const result = await commentService.getCommentList(offset, size)
        ctx.body = result
    }

    async updateComment(ctx, next) {
        const { content } = ctx.request.body
        const { commentId } = ctx.params
        try {
            const result = await commentService.updateComment(commentId, content)
            // console.log("result: ", result)
            if (result.length) {
                ctx.body = content
            }
            else {
                const error = new Error(errorType.UPDATA_COMMENT_FAILED)
                ctx.app.emit("error", error, ctx)
            }
        } catch (err) {
            console.log("err", err)
            if (err.sqlMessage) {
                const error = new Error(errorType.DATABASE_ERROR)
                ctx.app.emit("error", error, ctx)
            }
            else {
                console.error(err)
                throw err
            }
        }
    }

    async deleteComment(ctx, next) {

        await next()
    }
}


module.exports = new CommentController()