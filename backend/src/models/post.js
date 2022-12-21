import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  class_id: { type: mongoose.Types.ObjectId, ref: 'Class' },
  content: { type: String },
  condition: { type: String },
  deadline: { type: Date },
  tag: [{ type: String }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const PostModel = mongoose.model('Post', PostSchema);

export { PostModel };
