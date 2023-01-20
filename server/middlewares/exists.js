const User = require('../models/users/users.mongo')
const userModel = require('../models/users/users.model')
const groupModel = require('../models/groups/groups.model')
const topicModel = require('../models/topics/topics.model')
const postModel = require('../models/forum/posts/posts.model')
const resourceModel = require('../models/resources/resources.model')
const commentModel = require('../models/forum/comments/comments.model')

async function signUpExists(req, res, next) {
    try {
        const email = req.body.email
        const username = req.body.username

        const emailExists = await User.findOne({ email: email })
        const usernameExists = await User.findOne({ username: username })

        if (emailExists) {
            const e = new Error('Email already in use')
            e.status = 400
            throw e
        }

        if (usernameExists) {
            const e = new Error('Username already in use')
            e.status = 400
            throw e
        }

        console.log(req.body)

        res.email = email
        res.username = username
        next()
    } catch (e) {
        next(e)
    }
}

async function loginExists(req, res, next) {
    try {
        const username = req.body.username

        let user = await User.findOne({ username: username })

        if (!user) {
            user = await User.findOne({ email: username })
        }

        if (!user) {
            const e = new Error('Invalid email or password')
            e.status = 400
            throw e
        }

        res.user = user
        next()
    } catch (e) {
        next(e)
    }
}

async function userExists(req, res, next) {
    try {
        const uid = req.params.uid

        const user = await userModel.getUser(uid)

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        res.user = user
        req.uid = uid
        next()
    } catch (e) {
        next(e)
    }
}

async function groupExists(req, res, next) {
    try {
        const groupId = req.params.groupId

        const group = await groupModel.getGroup(groupId)

        if (!group) {
            return res.status(400).json({
                message: 'Group not found'
            })
        }

        res.group = group
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

        res.resource = resource
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
        res.post = post
        req.post = post
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
    loginExists,
    groupExists,
    signUpExists,
    commentExists,
    resourceExists,
}