const Comment = require('./comments.mongo')

async function addComment(commentDetails) {
    try {
        const comment = new Comment(commentDetails)

        return await comment.save()
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error adding comment'
        throw e
    }
}

async function findCommentById(commentId) {
    try {
        return await Comment.findById(commentId)
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error retrieving comment'
        throw e
    }
}

async function deleteComment(commentId) {
    try {
        return await Comment.findByIdAndDelete(commentId)
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error deleting comment'
        throw e
    }
}

module.exports = {
    addComment,
    findCommentById,
    deleteComment
}