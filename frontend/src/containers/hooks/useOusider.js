import { message } from 'antd'
import { createContext, useContext, useState, useEffect } from "react";


const OusiderContext = createContext({
  username: "",
  passWord: "",
  authenticated: false,
  postInfo: [],
  setUsername: () => {},
  setPassword: () => {},
  setAuthenticated: () => {},
  setPostInfo: () => {},
  displayStatus: () => {},
})


const OutsiderProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);  
  const [postInfo, setPostInfo] = useState([]);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = { content: msg, duration: 0.5 }

      switch (type) {
        case 'success':
          message.success(content) // show status of success
          break
        case 'error':
        default:
          message.error(content) // show status of error
          break
      }
    }
  }

  return (
    <OusiderContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        authenticated,
        setAuthenticated,
        postInfo,
        setPostInfo,
        displayStatus
      }}
      {...props}
    />
  )
}

const useOusider = () => useContext(OusiderContext); // define context consumer

export { OutsiderProvider, useOusider };