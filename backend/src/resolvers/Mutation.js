import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config";
import {
  UserInputError,
  ValidationError,
  AuthenticationError,
  ServerError,
} from "../error";
import { UserModel } from "../models/user";

// Authentication: signUp, login, logout

const Authentication = {
  signUp: async (
    parent,
    { account, name, password: plaintextPassword },
    { UserModel, res },
    info
  ) => {
    console.log("signUp");
    // Check if some input is empty

    if (!account || !name || !plaintextPassword) {
      throw new UserInputError("All fields must be provided.");
    }

    // Check if the account is existing

    const existingUser = await UserModel.findOne({ account });
    if (existingUser) {
      throw new UserInputError("Account has been registered.");
    }

    // Create a new account

    const password = await bcrypt.hash(plaintextPassword, config.SALT_ROUNDS);
    const user = await new UserModel({ account, name, password }).save();
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);

    // TODO: revise the returned value
    return {
      userId: user._id,
      account: user.account,
      name: user.name,
    };
  },

  login: async (
    parent,
    { account, password: plaintextPassword },
    { res, UserModel },
    info
  ) => {
    console.log("login");
    // Check if some input is empty

    if (!account || !plaintextPassword) {
      throw new UserInputError("All fields must be provided.");
    }

    // Check if the account is existing
    console.log("account:", account);

    const user = await UserModel.findOne({ account });
    if (!user) {
      throw new UserInputError("Account hasn't been registered.");
    }

    // Check if the password is correct

    console.log("plaintextPassword:", plaintextPassword);

    const valid = bcrypt.compareSync(plaintextPassword, user.password);
    if (!valid) {
      throw new UserInputError("Password is not correct!");
    }

    // set cookie

    console.log("set cookie");

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("userId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      userId: user._id,
      account: user.account,
      name: user.name,
    };
  },

  logout: async (parent, args, { res }, info) => {
    console.log("logout");

    res.cookie("userId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
    });
    return { msg: "Logout successfully!" };
  },
};

const UpdatingUser = {
  updateUser: async (
    parent,
    { name, account },
    { UserModel, userId },
    info
  ) => {
    if (!userId) {
      throw new AuthenticationError("You are logged out");
    }

    // Check if some input is empty

    if (!name || !account) {
      throw new UserInputError("All fields must be provided.");
    }

    // Check if the account is used by other users

    const existingUser = await UserModel.findOne({ account });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new UserInputError("Account has been used.");
    }

    // Update the user

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name, account },
      { new: true }
    );
    return { userId: user._id, account: user.account, name: user.name };
  },

  updatePassword: async (
    parent,
    { oldPassword, newPassword },
    { UserModel, userId },
    info
  ) => {
    console.log("updatePassword");

    if (!userId) {
      throw new AuthenticationError("You are logged out");
    }

    // Check if some input is empty

    if (!oldPassword || !newPassword) {
      throw new UserInputError("All fields must be provided.");
    }

    // Check if the past password is correct

    const user = await UserModel.findOne({ _id: userId });
    const valid = bcrypt.compareSync(oldPassword, user.password);
    if (!valid) {
      throw new UserInputError("Password is not correct!");
    }

    // Check if the passwords are different

    if (oldPassword === newPassword) {
      throw new UserInputError("New password is the same as the past one.");
    }

    // Update the password

    const hashedPassword = await bcrypt.hash(newPassword, config.SALT_ROUNDS);
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { new: true }
    );
    console.log("updatedUser:", updatedUser);
    if (!updatedUser) {
      throw new ServerError("Server error.");
    }

    return { msg: "Password updated successfully!" };
  },

  // deleteUser: async (parent, { userId }, { UserModel }, info) => {
  //   let deletedUser = await UserModel.findOne({ _id: userId });
  //   await UserModel.deleteOne({ _id: userId });
  //   return deletedUser;
  // },

  // // Update the user's post collection

  // try {
  //   await UserModel.findOneAndUpdate(mongoose.Types.ObjectId(userId), {
  //     $push: { postCollection: newPost._id },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw new ServerError(
  //     "Database error: failed to update user's post collection."
  //   );
  // }
};

const UpdatingPost = {
  createPost: async (
    parent,
    {
      title,
      classNo,
      className,
      teacherName,
      content,
      condition,
      deadline,
      tag,
    },
    { PostModel, userId },
    info
  ) => {
    console.log("createPost:");
    console.log(title, userId);

    if (!userId) {
      throw new AuthenticationError("You are logged out.");
    }

    // Check if some input is empty

    if (!title || !classNo || !className || !teacherName || !content) {
      throw new UserInputError("All fields must be provided.");
    }

    // Create a new post

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
      console.log("newPost:", newPost);
      return newPost;
    } catch (error) {
      console.log(error);
      throw new ServerError("Database error: failed to create a new post.");
    }
  },

  updatePost: async (
    parent,
    {
      postId,
      authorId,
      title,
      content,
      classNo,
      className,
      teacherName,
      condition,
      deadline,
      tag,
    },
    { PostModel, userId },
    info
  ) => {
    if (!userId) {
      throw new AuthenticationError("You are logged out.");
    }

    // Check if some input is empty

    if (!title || !classNo || !className || !teacherName || !content) {
      throw new UserInputError("All fields must be provided.");
    }

    // Check if the user is the author of the post

    if (userId !== authorId) {
      throw new AuthenticationError("You are not the author of the post.");
    }

    // Update the post

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

    if (!updatedPost) {
      throw new ServerError("Server error.");
    }

    return updatedPost;
  },

  updatePostCollection: async (
    parent,
    { postId },
    { userId, UserModel },
    info
  ) => {
    console.log("updatePostCollection");

    if (!userId) {
      throw new AuthenticationError("You are logged out.");
    }

    // Check if the user is following the post

    const postObjId = mongoose.Types.ObjectId(postId);

    const user = await UserModel.findById(userId);
    const index = user.postCollection.indexOf(postObjId);

    // Update the user's post collection

    if (index > -1) {
      user.postCollection.splice(index, 1);
      await user.save();
      return { msg: "unfollow the post!" };
    } else {
      user.postCollection.push(postObjId);
      await user.save();
      return { msg: "follow the post!" };
    }
  },

  deletePost: async (
    parent,
    { postId, authorId },
    { userId, PostModel },
    info
  ) => {
    console.log("deletePost");

    if (!userId) {
      throw new AuthenticationError("You are logged out.");
    }

    if (userId !== authorId) {
      throw new AuthenticationError("You are not the author of the post.");
    }

    const deletedPost = await PostModel.findOne({ _id: postId });
    if (!deletedPost) {
      throw new UserInputError("Post not found.");
    }

    await PostModel.deleteOne({ _id: postId });
    return { postId: deletedPost._id };
  },
};

const UpdatingChatBox = {
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

const Mutation = {
  ...Authentication,
  ...UpdatingPost,
  ...UpdatingUser,
  ...UpdatingChatBox,
};

export default Mutation;
