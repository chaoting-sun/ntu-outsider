import mongoose from 'mongoose'

const Schema = mongoose.Schema

// validation function for the email
// ref: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
var validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// "trim" in mongoose
// ref: https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
const UserSchema = Schema({
  name: { type: String, required: true },
  // password: { type: String, required: true },
  email: { 
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  preference: [{ type: mongoose.Types.ObjectId, ref: "Class" }],
  collection: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  validate: [validateEmail, 'Please fill a valid email address'],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const UserModel = mongoose.model('User', UserSchema)

export { UserModel }
