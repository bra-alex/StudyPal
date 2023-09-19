import postModel from '../../../models/forum/posts/posts.mongo'
import commentModel from '../../../models/forum/comments/comments.mongo'
import { Comments } from '../../../models/dto/dto'

async function addComment(commentDetails: Comments) {
  const comment = new commentModel(commentDetails)

  return await comment.save()
}

async function findCommentById(commentId: string) {
  return await commentModel.findById(commentId)
}

async function deleteComment({ postId, commentId }: { postId: string; commentId: string }) {
  const post = await postModel.findById(postId)
  if (!post) return null
  post.comments = post.comments.filter(c => c != commentId)

  await post.save()

  return await commentModel.findByIdAndDelete(commentId)
}

export { addComment, deleteComment, findCommentById }
