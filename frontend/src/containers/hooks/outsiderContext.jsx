import { createContext } from "react";

const OutsiderContext = createContext({
  user: {},
  posts: [],
  authenticated: false,
  
  setUser: () => {},
  setPosts: () => {},
  setAuthenticated: () => {},

  queryPost: () => {},
  deletePost: () => {},
  updatePostCollection: () => {},
});

export default OutsiderContext;