const Query = {
  queryChatBox: async (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    let boxName = [name1, name2].sort().join("_");
    let box = await ChatBoxModel.findOne({ name: boxName });
    if (!box) box = await new ChatBoxModel({ name: boxName }).save();
    return box;
  },
  user: async (parent, { name }, { UserModel }, info) => {
    return await UserModel.find({ name: { $regex: new RegExp(name, "i") } });
  },
  queryUser: async (parent, { account, password }, { UserModel }, info) => {
    let userExisitng = await UserModel.findOne({ account: account });
    const varifyPassword = (password, hashedPassword) => {
      bcrypt.compareSync(password, hashedPassword);
    } 
    if (userExisitng) {
      if (varifyPassword(password, userExisitng.password)) return userExisitng;
      else {
        // to deal with wrong password
        console.log("Wrong Password");
      }
    } else {
      console.log("User does not exist!")
      return null;
    }
  },
  post: async (parent, { postId }, { PostModel }, ingo) => {
    return await PostModel.findOne({ _id: postId });
  },
  queryPost: async (parent, { type, queryString }, { PostModel }, info) => {
    switch (type) {
      case "title":
        return await PostModel.find({
          title: { $regex: new RegExp(queryString, "i") },
        });
      case "tag":
        return await PostModel.find({
          tag: { $regex: new RegExp(queryString, "i") },
        });
      case "className":
        return await PostModel.find({
          className: { $regex: new RegExp(queryString, "i") },
        });
      case "classNo":
        return await PostModel.find({
          classNo: { $regex: new RegExp(queryString, "i") },
        });
      case "teacher":
        return await PostModel.find({
          teacher: { $regex: new RegExp(queryString, "i") },
        });
      default:
        return []; // 如果 field 的值不是上述任何一個，則返回空數組
    }
  },
  queryPostCollection: async (
    parent,
    { userId, type },
    { UserModel, PostModel },
    info
  ) => {
    switch (type) {
      case "uploadedPost":
        return await PostModel.find({ userId: userId });
      case "followedPost":
        let followList = await UserModel.find({ _id: userId }).postCollection;
        let allPosts = await PostModel.find();
        allPosts.filter(post => {
          console.log(post);
          followList.includes(post._id);
          return post;});
    }
  },
  queryChatBoxes: async(parent, {userId}, {UserModel, ChatBoxModel}, info) => {
    let chatBoxList = await UserModel.findOne({_id: userId}).chatboxes;
    let allChatBoxes = await ChatBoxModel.find();
    allChatBoxes.filter(chatbox => {
      console.log(chatbox);
      chatBoxList.includes(chatbox._id);
      return chatbox
    })
  }
};

export default Query;
