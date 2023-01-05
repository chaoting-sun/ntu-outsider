import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 新增 title
const PostSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    classNo: { type: String, required: true },
    className: { type: String, required: true},
    teacherName: {type: String, required: true},
    content: { type: String, required: true },
    // condition 是招收組員人數
    condition: { type: Number ,required: true},
    deadline: { type: String },
    tag: [{type: String}],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PostModel = mongoose.model("Post", PostSchema);

export { PostModel };
