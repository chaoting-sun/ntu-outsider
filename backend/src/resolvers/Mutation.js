const Mutation = {
  // 資料存在之後，應該有更好的寫法 send error
  createUser: async (
    parent,
    { name, email, password },
    { UserModel },
    info
  ) => {
    let userExisitng = await UserModel.findOne({ email: email });
    await UserModel.findOne({ email: email }).then(async (user) => {
      if (user) {
        console.log("Email has been used.");
      } else {
        userExisitng = await new UserModel({
          name: name,
          email: email,
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
      classNumber,
      className,
      title,
      content,
      tag,
      condition,
      deadline,
    },
    { PostModel, ClassModel },
    info
  ) => {
    let classExisting = await ClassModel.findOne({ classNumber: classNumber });
    if (!classExisting) {
      classExisting = await new ClassModel({
        classNumber: classNumber,
        className: className,
      }).save();
    }
    let newPost = await new PostModel({
      userId: userId,
      classId: classExisting._id,
      title: title,
      tag: tag,
      content: content,
      condition: condition,
      deadline: deadline,
    }).save();
    return newPost;
  },
  createComment: async (
    parent,
    { postId, userId, content },
    { CommentModel, PostModel },
    info
  ) => {
    let newComment = await new CommentModel({
      postId: postId,
      userId: userId,
      content: content,
    }).save();
    // console.log(newComment);
    await PostModel.findOneAndUpdate({ _id: postId}, {$push: {comments: newComment._id}}, {new: true});
    return newComment
  },
  createMessage: async (parent, { name, to, body }, { ChatBoxModel }, info) => {
    const chatBoxName = makeName(name, to);
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      await new ChatBoxModel({ name: chatBoxName }).save();
    }
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    return newMsg;
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
  deleteComment: async (parent, { commentId }, { CommentModel }, info) => {
    let deletedComment = await CommentModel.findOne({ _id: commentId });
    await CommentModel.deleteOne({ _id: commentId });
    return deletedComment;
  },
  updateUser: async (
    parent,
    { userId, name, password },
    { UserModel },
    info
  ) => {
    let updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name: name, password: password }
    );
    return updatedUser;
  },
  updatePost: async (
    parent,
    { postId, content, condition, tag, deadline },
    { PostModel },
    info
  ) => {
    let updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { content: content, condition: condition, deadline: deadline, tag: tag },
      { new: true }
    );
    return updatedPost;
  },
  updateComment: async (
    parent,
    { commentId, content },
    { CommentModel },
    info
  ) => {
    let updatedComment = await CommentModel.findOneAndUpdate(
      { _id: commentId },
      { content: content },
      { new: true }
    );
    return updatedComment;
  },
  updatePreference: async (
    parent,
    { userId, preference },
    { UserModel },
    info
  ) => {
    let userExisting = await UserModel.findOne({
      _id: userId,
      preference: preference,
    });
    console.log(userExisting);
    if (userExisting) {
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { preference: preference } }
      );
    } else {
      userExisting = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { preference: preference } }, {new: true}
      );
    }
    return await UserModel.findOne({ _id: userId });
  },
  updateCollection: async (
    parent,
    { userId, collectionName },
    { UserModel },
    info
  ) => {
    let userExisting = await UserModel.findOne({
      _id: userId,
      collectionName: collectionName, 
    });
    console.log(userExisting);
    if (userExisting) {
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { collectionName: collectionName } }
      );
    } else {
      userExisting = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { collectionName: collectionName } }, {new: true}
      );
    }
    return await UserModel.findOne({ _id: userId });
  },
};

export default Mutation;
