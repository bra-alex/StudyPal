const { generalNamespace } = require('../sockets')
const User = require('../models/users/users.mongo')
const Topic = require('../models/topics/topics.mongo')
const { deleteFolder } = require('../util/deleteFromStorage')
const postModel = require('../models/forum/posts/posts.model')
const commentModel = require('../models/forum/comments/comments.model')

async function httpFetchAllPosts(req, res, next) {
    try {
        const posts = await postModel.fetchAllPosts()

        res.status(200).json(posts)
    } catch (e) {
        next(e)
    }
}

async function httpFetchPost(req, res, next) {
    try {
        res.status(200).json(res.post)
    } catch (e) {
        next(e)
    }
}

async function httpCreatePost(req, res, next) {
    try {
        const topic = await Topic.findById(req.body.topic)
        let postMedia = []

        if (req.files) {
            const filePaths = req.files.map(file => ({ mediaURL: file.path }))
            postMedia = [...filePaths]
        }

        const postDetails = {
            author: req.body.author,
            postContent: req.body.postContent,
            topic: {
                id: req.body.topic,
                name: topic.name
            },
            comments: [],
            postMedia
        }

        const createdPost = await postModel.createPost(postDetails)

        const user = await User.findById(postDetails.author)

        user.posts = [...user.posts, createdPost]
        topic.posts = [...topic.posts, createdPost]

        await user.save()
        await topic.save()

        generalNamespace().io.emit('post', {
            action: 'create',
            post: createdPost
        })

        res.status(200).json(createdPost)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpAddComment(req, res, next) {
    try {
        let postMedia = []

        if (req.files) {
            const filePaths = req.files.map(file => ({ mediaURL: file.path }))
            postMedia = [...filePaths]
        }

        const comment = {
            user: req.body.user,
            postContent: req.body.postContent,
            postMedia
        }

        const createdComment = await commentModel.addComment(comment)

        const post = await postModel.findPostById(res.post._id)
        post.comments = [...post.comments, createdComment]

        await post.save()

        generalNamespace().io.emit('comment', {
            action: 'create',
            comment: createdComment
        })

        res.status(200).json(createdComment)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpDeletePost(req, res, next) {
    try {

        const post = await postModel.findPostById(res.post._id)

        const user = await User.findById(post.author)
        const topic = await Topic.findById(post.topic.id)

        user.posts = user.posts.filter(p => p._id != res.post._id)

        if (topic) {
            topic.posts = topic.posts.filter(p => p._id != res.post._id)
            await topic.save()
        }

        await user.save()

        await postModel.deletePost(res.post._id)

        deleteFolder(`uploads/forum/posts/${res.post.author}/`)

        generalNamespace().io.emit('post', {
            action: 'delete',
            post: res.post._id
        })

        res.status(200).json({
            message: 'Post deleted'
        })
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}

async function httpDeleteComment(req, res, next) {
    try {

        await commentModel.deleteComment(res.post._id, res.commentId)

        deleteFolder(`uploads/forum/posts/${res.post.author}/comments`)

        generalNamespace().io.emit('comment', {
            action: 'delete',
            comment: res.commentId
        })

        res.status(200).json({
            message: 'Comment deleted'
        })
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
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