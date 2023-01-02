const Mutation = {
  // 資料存在之後，應該有更好的寫法 send error

  createAccount: async (
    parent,
    { account, name, password },
    { UserModel },
    info
  ) => {
    let userExisitng = await UserModel.findOne({ account: account });
    await UserModel.findOne({ account: account }).then(async (user) => {
      if (user) {
        console.log(
          "This account exists, please choose another account or log in your account."
        );
      } else {
        userExisitng = await new UserModel({
          account: account,
          name: name,
          password: password,
        }).save();
      }
    });
    return userExisitng;
  },
  createPost: async (
    parent,
    {
      userId,
      classNo,
      className,
      teacher,
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
      teacher: teacher,
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
    let updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name: name, account: account }
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
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: newPassword }
      );
    } else {
      // 輸入密碼錯誤的處理？
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
      teacher,
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
        teacher: teacher,
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
    { ChatBoxModel, UserModel },
    info
  ) => {
    let chatBoxName = [name, to].sort().join("_");
    let chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      chatBox = await new ChatBoxModel({ name: chatBoxName });
      await UserModel.findOneAndUpdate(
        { _id: name },
        { $push: { chatboxes: chatBox._id } }
      );
      await UserModel.findOneAndUpdate(
        { _id: to },
        { $push: { chatboxes: chatBox._id } }
      );
    }
    return chatBox;
  },
  createMessage: async (
    parent,
    { name, to, message },
    { ChatBoxModel },
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
    return newMsg;
  },
};

export default Mutation;
