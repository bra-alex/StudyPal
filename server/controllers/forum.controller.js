const postModel = require('../models/forum/posts/posts.model')

async function httpFetchAllPosts(req, res, next) {
    try {
        const posts = await postModel.fetchAllPosts()

        if (!posts) {
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
        const postId = req.params.postId

        const post = await postModel.findPostById(postId)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json(post)

    } catch (e) {
        next(e)
    }
}

async function httpCreatePost(req, res, next) {
    try {
        const postDetails = req.body

        await postModel.createPost(postDetails)

        res.status(200).json(postDetails)
    } catch (e) {
        next(e)
    }
}

async function httpDeletePost(req, res, next) {
    try {
        const postId = req.params.postId
        
        await postModel.deletePost(postId)

        res.status(200)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpFetchAllPosts,
    httpFetchPost,
    httpCreatePost,
    httpDeletePost
}