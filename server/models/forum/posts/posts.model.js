const Post = require('./posts.mongo')

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
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error fetching post from database'
        throw e
    }
}

async function createPost(postDetails){
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

async function deletePost(postId){
    try {
        return await Post.deleteOne({_id: postId})
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error creating post'
        throw e
    }
}

module.exports = {
    fetchAllPosts,
    findPostById,
    createPost,
    deletePost
}