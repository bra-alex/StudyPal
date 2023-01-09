const userModel = require('../models/users/users.model')
const topicModel = require('../models/topics/topics.model')
const postModel = require('../models/forum/posts/posts.model')
const resourceModel = require('../models/resources/resources.model')
const commentModel = require('../models/forum/comments/comments.model')

async function userExists(req, res, next) {
    try {
        const uid = req.params.uid

        const user = await userModel.getUser(uid)

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        res.uid = uid
        next()
    } catch (e) {
        next(e)
    }
}

async function topicExists(req, res, next) {
    try {
        const topicId = req.params.topicId

        const topic = await topicModel.findTopicById(topicId)

        if (!topic) {
            return res.status(404).json({
                message: 'Topic not found'
            })
        }

        res.topicId = topicId
        next()
    } catch (e) {
        next(e)
    }
}

async function resourceExists(req, res, next) {
    try {
        const resourceId = req.params.resourceId

        const resource = await resourceModel.getResource(resourceId)

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found'
            })
        }

        res.resourceId = resourceId
        next()
    } catch (e) {
        next(e)
    }
}

async function postExists(req, res, next) {
    try {
        const postId = req.params.postId

        const post = await postModel.findPostById(postId)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        res.postId = postId
        next()
    } catch (e) {
        next(e)
    }
}

async function commentExists(req, res, next) {
    try {
        const commentId = req.params.commentId

        const comment = await commentModel.findCommentById(commentId)

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.commentId = commentId
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    userExists,
    postExists,
    topicExists,
    commentExists,
    resourceExists,
}