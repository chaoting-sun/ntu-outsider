const Mutation = {
  // 資料存在之後，應該有更好的寫法 send error

  createAccount: async (
    parent,
    { account, name, password },
    { UserModel },
    info
  ) => {
    let userExisitng = await UserModel.findOne({ account: account });
    if (userExisitng) {
      console.log(
        "This account exists, please choose another account or log in your account."
      );
      return null;
    } else {
      let newUser = await new UserModel({
        account: account,
        name: name,
        password: password,
      }).save();
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
    console.log('newPost:', newPost);
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
    console.log('updated user:', user);
    return user;
  },
  createChatBox: async (
    parent,
    { name, to },
    { ChatBoxModel, UserModel, pubsub },
    info
  ) => {
    console.log("create chatBox")
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
      })
      pubsub.publish(`chatBox ${to}`, {
        subscribeChatBox: chatBox,
      });
    }
    //console.log(`chatBox ${name}`)
    //console.log(`chatBox ${to}}`)
    return chatBox;
  },
  createMessage: async (
    parent,
    { name, to, message },
    { ChatBoxModel, pubsub },
    info
  ) => {
    console.log("create message")
    const chatBoxName = [name, to].sort().join("_");
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      await new ChatBoxModel({ name: chatBoxName }).save();
    }
    const newMsg = { sender: name, body: message };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    pubsub.publish(`message ${name}`, {
      subscribeMessage: {chatBoxName: chatBoxName, message: newMsg},
    })
    pubsub.publish(`message ${to}`, {
      subscribeMessage: {chatBoxName: chatBoxName, message: newMsg},
    })
    return {...newMsg};
  },
};

export default Mutation;
