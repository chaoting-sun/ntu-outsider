import bcrypt from "bcrypt";

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
    };
    if (userExisitng) {
      if (varifyPassword(password, userExisitng.password)) return userExisitng;
      else {
        // to deal with wrong password
        console.log("Wrong Password");
        return null;
      }
    }
    // if (userExisitng) {
    //   if (password === userExisitng.password) return userExisitng;
    //   else {
    //     // to deal with wrong password
    //     console.log("Wrong Password");
    //     return null;
    //   }
    // }
    else {
      console.log("User does not exist!");
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
      case "teacherName":
        return await PostModel.find({
          teacherName: { $regex: new RegExp(queryString, "i") },
        });
      case "all":
        return await PostModel.find({});
      default:
        return []; // 如果 type 的值不是上述任何一個，則返回空數組
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
        let user = await UserModel.findOne({ _id: userId });
        let followList = await user.postCollection;
        if (!followList) {
          return [];
        }
        const followedPosts = [];
        for (const postId of followList) {
          followedPosts.push(
            await PostModel.findOne({ _id: postId.toHexString() })
          );
        }
        console.log(followedPosts);
        return followedPosts;
      default:
        return [];
    }
  },
  queryChatBoxes: async (
    parent,
    { userId },
    { UserModel, ChatBoxModel },
    info
  ) => {
    let user = await UserModel.findOne({ _id: userId });
    let chatBoxes = await user.chatboxes;
    if (!chatBoxes) {
      return [];
    }
    const chatBoxesArray = [];
    for (const boxId of chatBoxes) {
      chatBoxesArray.push(
        await ChatBoxModel.findOne({ _id: boxId.toHexString() })
      );
    }
    return chatBoxesArray;
  },
};

export default Query;
