const postModel = require('../models/forum/posts/posts.model')
const commentModel = require('../models/forum/comments/comments.model')
const User = require('../models/users/users.mongo')
const Topic = require('../models/topics/topics.mongo')

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

        const createdPost = await postModel.createPost(postDetails)

        const user = await User.findById(postDetails.user)
        const topic = await Topic.findById(postDetails.topic)

        user.posts = [...user.posts, createdPost]
        topic.posts = [...topic.posts, createdPost]

        await user.save()
        await topic.save()

        res.status(200).json(createdPost)
    } catch (e) {
        e.status = 400
        next(e)
    }
}

async function httpAddComment(req, res, next) {
    try {
        const comment = req.body
        const createdComment = await commentModel.addComment(comment)

        const post = await postModel.findPostById(res.postId)
        post.comments = [...post.comments, createdComment]

        await post.save()

        res.status(200).json(createdComment)
    } catch (e) {
        next(e)
    }
}

async function httpDeletePost(req, res, next) {
    try {

        const post = await postModel.findPostById(res.postId)

        const user = await User.findById(post.user)
        const topic = await Topic.findById(post.topic)

        user.posts = user.posts.filter(p => p._id != res.postId)
        topic.posts = topic.posts.filter(p => p._id != res.postId)

        await user.save()
        await topic.save()

        await postModel.deletePost(res.postId)

        res.status(200).json({
            message: 'Post deleted'
        })
    } catch (e) {
        next(e)
    }
}

async function httpDeleteComment(req, res, next) {
    try {

        await commentModel.deleteComment(res.postId, res.commentId)

        res.status(200).json({
            message: 'Comment deleted'
        })
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