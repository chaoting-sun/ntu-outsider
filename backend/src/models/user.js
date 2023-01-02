import mongoose from "mongoose";

const Schema = mongoose.Schema;

// validation function for the email
// ref: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
// new ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript/46181#46181
// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// "trim" in mongoose
// ref: https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
const UserSchema = Schema(
  {
    account: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    // postCollection 為 array 收藏文章，放入文章的 _id 做為 foreign key
    postCollection: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    chatboxes: [{type: mongoose.Types.ObjectId, ref: "ChatBox"}]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
