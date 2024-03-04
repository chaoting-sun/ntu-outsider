import { React } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { OutsiderProvider } from "./containers/hooks/useOutsider";
import MainPage from "./containers/mainPage";
import SignInPage from "./containers/signInPage";
import Navbar from "./components/navbar/navBar";
import EditPostPage from "./containers/editPostPage";
import MailPage from "./containers/mailPage";
import MyProfilePage from "./containers/myProfilePage";
import PathConstants from "./routes/pathConstants";
import "./css/App.css";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: PathConstants.LOGIN,
    element: <SignInPage />,
  },
  {
    element: <Navbar />,
    children: [
      {
        path: PathConstants.MAIN,
        element: <MainPage />,
        index: true,
      },
      {
        path: PathConstants.EDIT_POST,
        element: <EditPostPage />,
      },
      {
        path: PathConstants.MAIL,
        element: <MailPage />,
      },
      {
        path: PathConstants.MY_PROFILE,
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

export default App;
