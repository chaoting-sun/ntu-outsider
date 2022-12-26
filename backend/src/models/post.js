import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 新增 title
const PostSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    classId: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
    content: { type: String, required: true },
    condition: { type: String },
    deadline: { type: Date },
    tag: [{ type: String }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PostModel = mongoose.model("Post", PostSchema);

export { PostModel };
