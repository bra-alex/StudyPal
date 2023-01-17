function deletePost(req, res, next) {
    if (res.post.author.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this post')
        e.status = 403
        next(e)
    }

    next()
}

function deleteComment(req, res, next) {
    if (res.comment.user.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this comment')
        e.status = 403
        next(e)
    }

    next()
}

function deleteGroup(req, res, next) {
    if (res.group.admin.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this group')
        e.status = 403
        next(e)
    }

    next()
}

function deleteResource(req, res, next) {
    if (res.resource.author.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this resource')
        e.status = 403
        next(e)
    }

    next()
}

function deleteTopic(req, res, next) {
    if (res.topic.author.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this topic')
        e.status = 403
        next(e)
    }

    next()
}

function updateUser(req, res, next) {
    if (res.user._id.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to update this user')
        e.status = 403
        next(e)
    }

    next()
}

function deleteUser(req, res, next) {
    if (res.user._id.toString() !== req.userId.toString()) {
        const e = new Error('Unauthorised to delete this user')
        e.status = 403
        next(e)
    }

    next()
}

module.exports = {
    updateUser,
    deleteUser,
    deletePost,
    deleteGroup,
    deleteTopic,
    deleteComment,
    deleteResource
}
