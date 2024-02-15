import "./css/App.css";

import { React } from "react";
import { OutsiderProvider } from "./containers/hooks/useOusider";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./containers/mainPage";
import SignInPage from "./containers/signInPage";
import Navbar from "./components/navigationBar";
import EditPostPage from "./containers/editPostPage";
import MailPage from "./containers/mailPage";
import MyProfilePage from "./containers/myProfilePage";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/logIn",
    element: <SignInPage />,
  },
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        index: true,
      },
      {
        path: "/editPostPage",
        element: <EditPostPage />,
      },
      {
        path: "/mailPage",
        element: <MailPage />,
      },
      {
        path: "/myProfilePage",
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
