const connections = require("../app/database")

const sqlFragment =  `
    select user.name,
    comment.id,
    content,
    comment.createAt,
    comment.updateAt,
    JSON_OBJECT('id', comment.id, 'name', user.name)
    as user
    from comment left join user on comment.user_id = user.id
 `

class CommentService {
    async createComment(userId, content) {
        const statement = `INSERT INTO comment(user_id, content) VALUES(?, ?)`
        const result = await connections.execute(statement, [userId, content])
        return result
    }

    async getComment(id) {
        const statement = `
            ${sqlFragment}
            where comment.id = ?;
        `
        const [result] = await connections.execute(statement, [id])
        return result[0];
    }

    async getCommentList(offset, size) {
        const statement = `
            ${sqlFragment}
            limit ?, ?;
        `
        const [result] = await connections.execute(statement, [offset, size])
        return result
    }

    async getAllCommentList() {
        const statement = `
            ${sqlFragment};
        `
        const result = await connections.execute(statement)
        return result[0]
    }

    async updateComment(commentId, content) {
        const statement = `UPDATE comment SET content = ? where id = ? limit 1;`
        const result = await connections.execute(statement, [content, commentId])
        return result
    }

    async deleteComment(commentId) {
        // const statement = 
    }
}

module.exports = new CommentService()