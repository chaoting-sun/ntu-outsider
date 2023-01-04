import bcrypt from 'bcrypt';

const Mutation = {
  // 資料存在之後，應該有更好的寫法 send error

  createAccount: async (
    parent,
    { account, name, password },
    { UserModel },
    info
  ) => {
    let userExisting = await UserModel.findOne({ account: account });
    if (userExisting) {
      console.log(
        "This account exists, please choose another account or log in your account."
      );
      return null;
    } else {
      const newUser = await new UserModel({
        account: account,
        name: name,
        password: password,
      }).save();
      console.log('newUser:', newUser);
      return newUser;
    }
  },
  createPost: async (
    parent,
    {
      userId,
      classNo,
      className,
      teacherName,
      title,
      content,
      tag,
      condition,
      deadline,
    },
    { PostModel },
    info
  ) => {
    let newPost = await new PostModel({
      userId: userId,
      classNo: classNo,
      className: className,
      teacherName: teacherName,
      title: title,
      tag: tag,
      content: content,
      condition: condition,
      deadline: deadline,
    }).save();
    return newPost;
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
    let accountUsed = await findOne({ account: account });
    if (accountUsed) {
      return null;
    }
    let updatedUser = await UserModel.findOneAndUpdate(
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
    let password = await UserModel.findOne({ _id: userId }).password;
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
    let updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: title,
        content: content,
        classNo: classNo,
        className: className,
        teacherName: teacherName,
        condition: condition,
        deadline: deadline,
        tag: tag,
      },
      { new: true }
    );
    return updatedPost;
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
    console.log(userExisting);
    if (userExisting) {
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { postCollection: postId } }
      );
    } else {
      userExisting = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { postCollection: postId } },
        { new: true }
      );
    }
    return await UserModel.findOne({ _id: userId });
  },
  createChatBox: async (
    parent,
    { name, to },
    { ChatBoxModel, UserModel, pubsub },
    info
  ) => {
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
    }
    pubsub.publish(`chatBox ${name}`, {
      subscribeChatBox: chatBox,
    });
    pubsub.publish(`chatBox ${to}}`, {
      subscribeChatBox: chatBox,
    });
    return chatBox;
  },
  createMessage: async (
    parent,
    { name, to, message },
    { ChatBoxModel, pubsub },
    info
  ) => {
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
    return { ...newMsg };
  },
};

export default Mutation;
