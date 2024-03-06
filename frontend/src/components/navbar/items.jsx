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
    text: "所有貼文",
    key: "allPost",
    icon: <DonutSmallIcon />,
    loggedIn: false,
    href: PathConstants.MAIN_POST,
  },
  {
    text: "我的貼文",
    key: "uploadedPost",
    icon: <AccessibilityNewIcon />,
    loggedIn: true,
    href: PathConstants.MAIN_POST,
  },
  {
    text: "追蹤貼文",
    key: "followedPost",
    icon: <StarHalfIcon />,
    loggedIn: true,
    href: PathConstants.EDIT_POST,
  },
];

export const accountItems = [
  {
    text: "登入",
    key: "logIn",
    icon: <LoginIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: PathConstants.LOGIN,
  },
  {
    text: "註冊",
    key: "signUp",
    icon: <AppRegistrationIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: PathConstants.LOGIN,
  },
  {
    text: "登出",
    key: "logOut",
    icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: PathConstants.LOGIN,
  },
  {
    text: "編輯個人資料",
    key: "editProfile",
    icon: <AccountBoxIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: PathConstants.MY_PROFILE,
  },
];
