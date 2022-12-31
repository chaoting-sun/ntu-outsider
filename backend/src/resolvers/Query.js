const Query = {
  chatBox: async (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    let boxName = [name1, name2].sort().join("_");
    let box = await ChatBoxModel.findOne({ name: boxName });
    if (!box) box = await new ChatBoxModel({ name: boxName }).save();
    return box;
  },
  user: async(parent, {name}, {UserModel}, info) => {
    return await UserModel.find({name: {$regex: new RegExp(name, "i")}});
  },
  post: async(parent, {postId}, {PostModel}, ingo) =>{
    return await PostModel.findOne({_id: postId});
  },
  comment: async(parent, {commentId}, {CommentModel}, info) => {
    return await CommentModel.findOne({_id: commentId});
  },
  postByTitle: async (parent, { title }, { PostModel }, info) => {
    return await PostModel.find({title: {$regex: new RegExp(title, "i")}});
  },
  postByTag: async (parent, { tag }, { PostModel }, info) => {
    return await PostModel.find({tag: {$regex: new RegExp(tag, "i")}});
  }
};

export default Query;
