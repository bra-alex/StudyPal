const Comment = require('./comments.mongo')
const Post = require('../posts/posts.mongo')

async function addComment(commentDetails) {
    try {
        const comment = new Comment(commentDetails)

        return await comment.save()
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 400
        e.message = 'Error adding comment'
        throw e
    }
}

async function findCommentById(commentId) {
    try {
        return await Comment.findById(commentId)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error retrieving comment'
        throw e
    }
}

async function deleteComment(postId, commentId) {
    try {
        const post = await Post.findById(postId)
        post.comments = post.comments.filter(c => c != commentId)

        await post.save()

        return await Comment.findByIdAndDelete(commentId)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
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