const Comment = require('./comments.mongo')

async function addComment(commentDetails){
    try {
        const comment = new Comment(commentDetails)

        return await comment.save()
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error adding comment'
        throw e
    }
}

async function deleteComment(commentId){
    try {
        return await Comment.deleteOne({_id: commentId})
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error creating post'
        throw e
    }
}

module.exports = {
    addComment,
    deleteComment
}