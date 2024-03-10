import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

const Mutation = {
  createAccount: async (
    parent,
    { account, name, password },
    { UserModel },
    info
  ) => {
    console.log("createAccount:", account, name, password);

    // Check if some input is empty

    if (!account || !name || !password) {
      return {
        __typename: "ValidationError",
        path: "input",
        report: "All fields must be provided.",
      };
    }

    // Check if the account is existing

    const existingUser = await UserModel.findOne({ account });
    if (existingUser) {
      return {
        __typename: "ValidationError",
        path: "account",
        report: "Account has been registered",
      };
    }

    // Create a new account

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await new UserModel({
        account,
        name,
        password: hashedPassword,
      }).save();
      console.log("Created user:", newUser);
      return { __typename: "User", ...newUser.toObject() };
    } catch (error) {
      console.log(error);
      return {
        __typename: "ServerError",
        report: "Server error.",
      };
    }
  },

  createPost: async (
    parent,
    {
      userId,
      title,
      classNo,
      className,
      teacherName,
      content,
      condition,
      deadline,
      tag,
    },
    { PostModel },
    info
  ) => {
    console.log("createPost")
    try {
      const newPost = await new PostModel({
        userId,
        title,
        classNo,
        className,
        teacherName,
        content,
        condition,
        deadline,
        tag,
      }).save();
      console.log("newPost:", newPost)
      return { __typename: "Post", ...newPost.toObject() };
    } catch (error) {
      console.log(error);
      return {
        __typename: "ServerError",
        report: "Server error.",
      };
    }
  },
  deleteUser: async (parent, { userId }, { UserModel }, info) => {
    let deletedUser = await UserModel.findOne({ _id: userId });
    await UserModel.deleteOne({ _id: userId });
    return deletedUser;
  },
  deletePost: async (parent, { postId }, { PostModel }, info) => {
    let deletedPost = await PostModel.findOne({ _id: postId });
    await PostModel.deleteOne({ _id: postId });
    return deletedPost;
  },
  updateUser: async (
    parent,
    { userId, name, account },
    { UserModel },
    info
  ) => {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name: name, account: account },
      { new: true }
    );
    return updatedUser;
  },
  updatePassword: async (
    parent,
    { userId, oldPassword, newPassword },
    { UserModel },
    info
  ) => {
    let password = (await UserModel.findOne({ _id: userId })).password;
    if (password === oldPassword) {
      return await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true }
      );
    } else {
      // 輸入密碼錯誤的處理？
      console.log("Password wrong!");
      return null;
    }
  },
  updatePost: async (
    parent,
    {
      postId,
      title,
      content,
      classNo,
      className,
      teacherName,
      condition,
      deadline,
      tag,
    },
    { PostModel },
    info
  ) => {
    try {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          title,
          content,
          classNo,
          className,
          teacherName,
          condition,
          deadline,
          tag,
        },
        { new: true }
      );
      return { __typename: "Post", ...updatedPost.toObject() };
    } catch (error) {
      console.log(error);
      return {
        __typename: "ServerError",
        report: "Server error.",
      };
    }
  },
  updatePostCollection: async (
    parent,
    { userId, postId },
    { UserModel },
    info
  ) => {
    let userExisting = await UserModel.findOne({
      _id: userId,
      postCollection: postId,
    });
    if (userExisting) {
      console.log("unfollow the post!");
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { postCollection: postId } }
      );
    } else {
      console.log("follow the post!");
      userExisting = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { postCollection: postId } },
        { new: true }
      );
    }
    const user = await UserModel.findOne({ _id: userId });
    console.log("updated user:", user);
    return user;
  },
  createChatBox: async (
    parent,
    { name, to },
    { ChatBoxModel, UserModel, pubsub },
    info
  ) => {
    console.log("create chatBox");
    let chatBoxName = [name, to].sort().join("_");
    let chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      chatBox = await new ChatBoxModel({ name: chatBoxName }).save();
      await UserModel.findOneAndUpdate(
        { _id: name },
        { $push: { chatboxes: chatBox._id } }
      );
      await UserModel.findOneAndUpdate(
        { _id: to },
        { $push: { chatboxes: chatBox._id } }
      );
      console.log("publish");
      pubsub.publish(`chatBox ${name}`, {
        subscribeChatBox: chatBox,
      });
      pubsub.publish(`chatBox ${to}`, {
        subscribeChatBox: chatBox,
      });
      console.log(`chatBox ${name}`);
      console.log(`chatBox ${to}`);
    }
    return chatBox;
  },
  createMessage: async (
    parent,
    { name, to, message },
    { ChatBoxModel, pubsub },
    info
  ) => {
    console.log("create message");
    const chatBoxName = [name, to].sort().join("_");
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      await new ChatBoxModel({ name: chatBoxName }).save();
    }
    const newMsg = { sender: name, body: message };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    pubsub.publish(`message ${name}`, {
      subscribeMessage: { chatBoxName: chatBoxName, message: newMsg },
    });
    pubsub.publish(`message ${to}`, {
      subscribeMessage: { chatBoxName: chatBoxName, message: newMsg },
    });
    return { ...newMsg };
  },
};

export default Mutation;
