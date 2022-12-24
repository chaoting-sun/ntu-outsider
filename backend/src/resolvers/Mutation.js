import { findDangerousChanges } from "graphql";
import { UserModel } from "../models";

const Mutation = {
  createUser: async (
    parent,
    { name, email, password },
    { UserModel },
    info
  ) => {
    let userExisting = await UserModel.findOne({ email: email });
    if (!userExisting) {
      userExisting = await new UserModel({
        name: name,
        email: email,
        password: password,
      }).save();
    }
    return userExisting;
  },
  createPost: async (
    parent,
    { user_id, classNumber, className, title, content, condition, deadline },
    { PostModel, ClassModel },
    info
  ) => {
    let classExisting = await ClassModel.findOne({ classNumber: classNumber });
    if (!classExisting) {
      classExisting = new ClassModel({
        classNumber: classNumber,
        className: className,
      }).save();
    }
    let newPost = await new PostModel({
        user_id: user_id,
        class_id: classExisting._id,
        title: title,
        content: content,
        condition: condition,
        deadline: deadline,
      }).save();
    return newPost
  },
  createComment: async (
    parent,
    { post_id, user_id, content },
    { CommentModel },
    info
  ) => {
    return await new CommentModel({
      post_id: post_id,
      user_id: user_id,
      content: content,
    }).save();
  },
  createMessage: async (parent, { name, to, body }, { ChatBoxModel }, info) => {
    const chatBoxName = makeName(name, to);
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    return newMsg;
  },
};

export default Mutation;
