import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = Schema({
  postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

export { CommentModel };
