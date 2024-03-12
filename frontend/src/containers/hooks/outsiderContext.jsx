import { createContext } from "react";

const OutsiderContext = createContext({
  user: {},
  authenticated: false,
  setUser: () => {},
  handleAuthenticated: () => {},
  displayStatus: () => {},
});

export default OutsiderContext;