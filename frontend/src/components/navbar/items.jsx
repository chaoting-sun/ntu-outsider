import PathConstants from "../../routes/pathConstants";

import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import PostAddIcon from "@mui/icons-material/PostAdd";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const postItems = [
  {
    text: "All posts",
    key: "allPost",
    icon: <DonutSmallIcon />,
    href: PathConstants.MAIN_POST,
  },
  {
    text: "My post",
    key: "uploadedPost",
    icon: <AccessibilityNewIcon />,
    href: PathConstants.MAIN_POST,
  },
  {
    text: "Followed",
    key: "followedPost",
    icon: <StarHalfIcon />,
    href: PathConstants.EDIT_POST,
  },
];

export const accountItems = [
  {
    text: "Log in",
    key: "logIn",
    icon: <LoginIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: PathConstants.LOGIN,
  },
  {
    text: "Sign up",
    key: "signUp",
    icon: <AppRegistrationIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: PathConstants.LOGIN,
  },
  {
    text: "Log out",
    key: "logOut",
    icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: PathConstants.MAIN,
  },
  {
    text: "Edit profile",
    key: "editProfile",
    icon: <AccountBoxIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: PathConstants.MY_PROFILE,
  },
];
