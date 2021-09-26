const Router = require("koa-router")

const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth_middleware")

const {
    createComment,
    getComment,
    getCommentList,
    deleteComment,
    updateComment
} = require("../controller/comment_controller")

const commentRouter = new Router({prefix: "/comment"})

commentRouter.get("/", getCommentList)
commentRouter.post("/", verifyAuth, createComment)

commentRouter.get("/:commentId", getComment)
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, updateComment)
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, deleteComment)


module.exports = commentRouter