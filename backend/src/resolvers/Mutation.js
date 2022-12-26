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
    { userId, classNumber, className, title, content, condition, deadline },
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
        userId: userId,
        classId: classExisting._id,
        title: title,
        content: content,
        condition: condition,
        deadline: deadline,
      }).save();
    return newPost
  },
  createComment: async (
    parent,
    { postId, userId, content },
    { CommentModel },
    info
  ) => {
    return await new CommentModel({
      postId: postId,
      userId: userId,
      content: content,
    }).save();
  },
  createMessage: async (parent, { name, to, body }, { ChatBoxModel }, info) => {
    const chatBoxName = makeName(name, to);
    const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if(!chatBox){ await new ChatBoxModel({name: chatBoxName}).save();}
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    return newMsg;
  },
  deleteUser: async (parent, {userId}, {UserModel}, info) => {
    let deletedUser = await UserModel.findOne({_id: userId});
    await UserModel.deleteOne({_id: userId});
    return deletedUser;
  },
  deletePost: async(parent, {postId}, {PostModel}, info) => {
    let deletedPost = await PostModel.findOne({_id: postId});
    await PostModel.deleteOne({_id: postId});
    return deletedPost; 
  },
  deleteComment: async(parent, {commentId}, {CommentModel}, info) => {
    let deletedComment = await CommentModel.findOne({_id: commentId});
    await CommentModel.deleteOne({_id: commentId});
    return deletedComment;
  },
  updateUser: async(parent, {userId, name, password}, {UserModel}, info) => {
    let updatedUser = await UserModel.findOneAndUpdate({_id: userId}, {name: name, password: password});
    return updatedUser;
  },
  updatePost: async(parent, {postId, content, condition, deadline}, {PostModel}, info) => {
    let updatedPost = await PostModel.findOneAndUpdate({_id: postId}, {content:content, condition:condition, deadline:deadline});
    return updatedPost;
  },
  updateComment: async(parent, {commentId, content}, {CommentModel}, info) => {
    let updatedComment = await CommentModel.findOneAndUpdate({_id: commentId}, {content: content});
    return updatedComment;
  }
};

export default Mutation;
