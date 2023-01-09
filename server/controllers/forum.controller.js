const postModel = require('../models/forum/posts/posts.model')
const commentModel = require('../models/forum/comments/comments.model')

async function httpFetchAllPosts(req, res, next) {
    try {
        const posts = await postModel.fetchAllPosts()

        if (posts.length === 0) {
            return res.status(404).json({
                message: 'No posts found'
            })
        }

        res.status(200).json(posts)

    } catch (e) {
        next(e)
    }
}

async function httpFetchPost(req, res, next) {
    try {
        const post = await postModel.findPostById(res.postId)

        res.status(200).json(post)
    } catch (e) {
        next(e)
    }
}

async function httpCreatePost(req, res, next) {
    try {
        const postDetails = req.body
        postDetails.comments = []

        await postModel.createPost(postDetails)

        res.status(200).json(postDetails)
    } catch (e) {
        next(e)
    }
}

async function httpAddComment(req, res, next) {
    try {
        const comment = req.body
        comment.post = res.postId

        await commentModel.addComment(comment)

        res.status(200).json(comment)
    } catch (e) {
        next(e)
    }
}

async function httpDeletePost(req, res, next) {
    try {
        await postModel.deletePost(res.postId)

        res.status(200)
    } catch (e) {
        next(e)
    }
}

async function httpDeleteComment(req, res, next) {
    try {
        const commentId = req.params.commentId
        await commentModel.deleteComment(commentId)

        res.status(200)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpFetchAllPosts,
    httpFetchPost,
    httpCreatePost,
    httpAddComment,
    httpDeletePost,
    httpDeleteComment
}