const Post = require('./posts.mongo')
const Comment = require('../comments/comments.mongo')

async function fetchAllPosts() {
    try {
        return await Post.find({},
            {
                '__v': 0
            }
        )
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error fetching posts from database'
        throw e
    }
}

async function findPostById(id) {
    try {
        return await Post.findById(id, {
            '__v': 0
        })
            .populate({
                path: 'comments'
            })
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error fetching post from database'
        throw e
    }
}

async function createPost(postDetails) {
    try {
        const post = new Post(postDetails)

        return await post.save()
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error creating post'
        throw e
    }
}

async function deletePost(postId) {
    try {
        const post = await Post.findById(postId)
        post.comments.forEach(async (comment) => {
            await Comment.findByIdAndDelete(comment)
        })
        return await Post.findByIdAndDelete(postId)
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error deleting post'
        throw e
    }
}

module.exports = {
    fetchAllPosts,
    findPostById,
    createPost,
    deletePost
}