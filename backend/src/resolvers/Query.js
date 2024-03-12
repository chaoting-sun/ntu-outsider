import bcrypt from "bcryptjs";

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
    console.log("execute queryUser:", account, password);

    // Check if some input is empty

    if (!account || !password) {
      return {
        __typename: "ValidationError",
        path: "input",
        report: "All fields must be provided!",
      };
    }

    try {
      // Check if the account is existing

      const existingUser = await UserModel.findOne({ account });
      if (!existingUser) {
        return {
          __typename: "ValidationError",
          path: "account",
          report: "Account hasn't been registered!",
        };
      }

      // Check if the password is correct

      console.log(password, existingUser.password);

      const validPassword = bcrypt.compareSync(password, existingUser.password);
      if (validPassword) {
        console.log({ __typename: "User", ...existingUser.toObject() });
        return { __typename: "User", ...existingUser.toObject() };
      } else {
        return {
          __typename: "ValidationError",
          path: "password",
          report: "Password is not correct!",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        __typename: "ServerError",
        report: "Server error.",
      };
    }
  },

  post: async (parent, { postId }, { PostModel }, ingo) => {
    return await PostModel.findOne({ _id: postId });
  },

  queryPost: async (
    parent,
    { type, queryString },
    { PostModel, userId },
    info
  ) => {
    console.log("queryPost:");

    let fetchedPosts;
    switch (type) {
      case "title":
        fetchedPosts = await PostModel.find({
          title: { $regex: new RegExp(queryString, "i") },
        });
        break;
      case "tag":
        fetchedPosts = await PostModel.find({
          tag: { $regex: new RegExp(queryString, "i") },
        });
        break;
      case "className":
        fetchedPosts = await PostModel.find({
          className: { $regex: new RegExp(queryString, "i") },
        });
        break;
      case "classNo":
        fetchedPosts = await PostModel.find({
          classNo: { $regex: new RegExp(queryString, "i") },
        });
        break;
      case "teacherName":
        fetchedPosts = await PostModel.find({
          teacherName: { $regex: new RegExp(queryString, "i") },
        });
        break;
      case "all":
        fetchedPosts = await PostModel.find({});
        break;
      default:
        return []; // 如果 type 的值不是上述任何一個，則返回空數組
    }
    return fetchedPosts;
  },

  queryPostCollection: async (
    parent,
    { userId, type },
    { UserModel, PostModel },
    info
  ) => {
    switch (type) {
      case "uploadedPost":
        const post = await PostModel.find({ userId: userId });
        console.log("uploadedPost:", post);
        return post;
      case "followedPost":
        let user = await UserModel.findOne({ _id: userId });
        let followList = await user.postCollection;
        if (!followList) {
          return [];
        }
        let followedPosts = [];
        for (const postId of followList) {
          followedPosts.push(
            await PostModel.findOne({ _id: postId.toHexString() })
          );
        }
        console.log("followedPosts:", followedPosts);
        return followedPosts;
      case "allPost":
        return await PostModel.find({});
      default:
        console.log("no such query:", type);
        return [];
    }
  },

  queryChatBoxes: async (
    parent,
    { userId },
    { UserModel, ChatBoxModel },
    info
  ) => {
    //console.log("query chatboxes");
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
    console.log(chatBoxesArray);
    return chatBoxesArray;
  },
};

export default Query;
