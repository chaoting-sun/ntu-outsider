import { React, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { OutsiderProvider } from "./containers/hooks/useOutsider";

import MainPage from "./containers/mainPage/mainPage";
import SignInPage from "./containers/signIn/signInPage";
import EditPostPage from "./containers/editPost/editPostPage";
import MailPage from "./containers/mailPage/mailPage";
import MyProfilePage from "./containers/myProfile/myProfilePage";
import NavBar from "./containers/navBar/navBar";
import paths from "./constants/paths";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <SignInPage />,
  },
  {
    element: <NavBar />,
    children: [
      {
        path: paths.MAIN,
        element: <MainPage />,
        index: true,
      },
      {
        path: paths.EDIT_POST,
        element: <EditPostPage />,
      },
      {
        path: paths.MAIL,
        element: <MailPage />,
      },
      {
        path: paths.MY_PROFILE,
        element: <MyProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <OutsiderProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </OutsiderProvider>
  );
}


// import { POST_QUERY } from "./containers/graphql";
// import { useLazyQuery } from "@apollo/client";
// import { useCallback } from "react";
// import axios from "axios";

// const App = () => {
//   const [queryPost] = useLazyQuery(POST_QUERY, { fetchPolicy: "network-only" });

//   const queryAllPosts = useCallback(async () => {
//     const res = await queryPost({
//       variables: { type: "all", queryString: "" },
//     });
//     console.log(res);
//   }, [queryPost]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/").then(res => {
//       console.log("res:", res);
//     })
//     // axios.get("http://localhost:5001/").then(res => {
//     //   console.log("res:", res);
//     // })
//   }, []);



//   useEffect(() => {
//     queryAllPosts();
//   }, [queryAllPosts]);
// };

export default App;
