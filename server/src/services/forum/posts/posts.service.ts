import postModel from '../../../models/forum/posts/posts.mongo'
import commentModel from '../../../models/forum/comments/comments.mongo'
import { Posts } from '../../../models/dto/dto'

async function fetchAllPosts() {
  return await postModel
    .find(
      {},
      {
        __v: 0,
      },
    )
    .populate('author', ['name', 'username'])
}

async function findPostById(id: string) {
  return await postModel
    .findById(id, {
      __v: 0,
    })
    .populate({
      path: 'comments',
    })
}

async function createPost(postDetails: Posts) {
  const post = new postModel(postDetails)

  return await post.save()
}

async function deletePost(postId: string) {
  const post = await postModel.findById(postId)
  if (!post) return null
  post.comments.forEach(async comment => {
    await commentModel.findByIdAndDelete(comment)
  })
  return await postModel.findByIdAndDelete(postId)
}

export { fetchAllPosts, findPostById, createPost, deletePost }
