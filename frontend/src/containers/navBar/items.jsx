import paths from "../../constants/paths";

import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import PostAddIcon from "@mui/icons-material/PostAdd";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import actions from "../../constants/actions";

export const postItems = [
  {
    text: "所有貼文",
    icon: <DonutSmallIcon />,
    canLogOut: true,
    action: null,
    href: paths.MAIN_POST,
  },
  {
    text: "我的貼文",
    icon: <AccessibilityNewIcon />,
    canLogOut: false,
    action: null,
    href: paths.MAIN_POST,
  },
  {
    text: "追蹤貼文",
    icon: <StarHalfIcon />,
    canLogOut: false,
    action: null,
    href: paths.MAIN_POST,
  },
  {
    text: "新增貼文",
    icon: <PostAddIcon />,
    canLogOut: false,
    action: actions.ADD_POST,
    href: paths.EDIT_POST,
  },
];

export const accountItems = [
  {
    text: "登入",
    key: "logIn",
    icon: <LoginIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: paths.LOGIN,
  },
  {
    text: "註冊",
    key: "signUp",
    icon: <AppRegistrationIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: false,
    href: paths.LOGIN,
  },
  {
    text: "登出",
    key: "logOut",
    icon: <LogoutIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: paths.LOGIN,
  },
  {
    text: "編輯個人資料",
    key: "editProfile",
    icon: <AccountBoxIcon sx={{ fontSize: "2rem" }} />,
    loggedIn: true,
    href: paths.MY_PROFILE,
  },
];
