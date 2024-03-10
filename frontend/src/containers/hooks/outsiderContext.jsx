import { createContext } from "react";

const OutsiderContext = createContext({
  userId: null,
  username: "",
  passWord: "",
  authenticated: false,
  setUserId: () => {},
  setUsername: () => {},
  setPassword: () => {},
  handleAuthenticated: () => {},
  displayStatus: () => {},
});

export default OutsiderContext;