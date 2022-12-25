const Query = {
  chatBox: async (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    let boxName = [name1, name2].sort().join("_");
    let box = await ChatBoxModel.findOne({ name: boxName });
    if (!box) box = await new ChatBoxModel({ name: boxName }).save();
    return box;
  },
  postByTitle: async (parent, { title }, { PostModel }, info) => {
    return await PostModel.filter((post) => {
      const isTitleMatch = post.title.includes(title);
      return isTitleMatch;
    });
  },
  postByTag: async (parent, { tag }, { PostModel }, info) => {
    return await PostModel.filter((post) => {
        const isTagMatch = post.tag.includes(tag);
        return isTagMatch;
      });
  }
};

export default Query;
