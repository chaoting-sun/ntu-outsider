import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { Tooltip, formLabelClasses } from "@mui/material";

import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import PostAddIcon from "@mui/icons-material/PostAdd";

import paths from "../../constants/paths";
import actions from "../../constants/actions";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import HeaderLink from "../../components/headerLink/headerLink";
import DrawerLink from "../../components/drawerLink/drawerLink";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { postItems, accountItems } from "./items";
import styles from "./miniDrawer.module.css";
import PropTypes from "prop-types";
import { LOGOUT_MUTATION } from "../graphql";
import { displayStatus } from "../utils";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "var(--main-bg)",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer = ({ authenticated, children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [Logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      navigate(paths.LOGIN, { state: { action: actions.LOGIN } });
      displayStatus({ type: "success", msg: "Logout successfully" });
    },
    onError: (error) => {
      console.log("logout error:", error);
      displayStatus({ type: "error", msg: "Logout failed" });
    },
  });

  const HeaderLinks = () => {
    return (
      <>
        {authenticated ? (
          <>
            <HeaderLink
              text="登出"
              icon={<LogoutIcon sx={{ fontSize: "2rem" }} />}
              href={paths.LOGIN}
              handleAction={(link) => {
                Logout();
                navigate(link, { state: { login: actions.LOGIN } });
              }}
            />
            <HeaderLink
              text="編輯個人資料"
              icon={<AccountBoxIcon sx={{ fontSize: "2rem" }} />}
              href={paths.MY_PROFILE}
              handleAction={(link) => {
                navigate(link);
              }}
            />
          </>
        ) : (
          <>
            <HeaderLink
              text="登入"
              icon={<LoginIcon sx={{ fontSize: "2rem" }} />}
              href={paths.LOGIN}
              handleAction={(link) => {
                navigate(link, { state: { action: actions.LOGIN } });
              }}
            />
            <HeaderLink
              text="註冊"
              icon={<AppRegistrationIcon sx={{ fontSize: "2rem" }} />}
              href={paths.LOGIN}
              handleAction={(link) => {
                navigate(link, { state: { action: actions.SIGNUP } });
              }}
            />
          </>
        )}
      </>
    );
  };

  const DrawerLinks = () => {
    return (
      <>
        <DrawerLink
          text="所有貼文"
          icon={<DonutSmallIcon />}
          href={paths.MAIN}
          open={open}
          handleAction={(link) => {
            navigate(link);
          }}
        />
        {authenticated && (
          <DrawerLink
            text="我的貼文"
            icon={<AccessibilityNewIcon />}
            href={paths.MAIN}
            open={open}
            handleAction={(link) => {
              navigate(link, { state: { action: actions.MY_POST } });
            }}
          />
        )}
        {authenticated && (
          <DrawerLink
            text="追蹤貼文"
            icon={<StarHalfIcon />}
            href={paths.MAIN}
            open={open}
            handleAction={(link) => {
              navigate(link, { state: { action: actions.FOLLOW_POST } });
            }}
          />
        )}
        {authenticated && (
          <DrawerLink
            text="新增貼文"
            icon={<PostAddIcon />}
            href={paths.EDIT_POST}
            open={open}
            handleAction={(link) => {
              navigate(link, { state: { action: actions.ADD_POST } });
            }}
          />
        )}
      </>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={styles.header}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img src="/ntu-symbol.png" width={45} height={45} />
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ fontWeight: "bold", marginLeft: "15px" }}
            >
              NTU
              <br />
              Outsider
            </Typography>
          </Box>
          <Box>
            <nav aria-label="main mailbox folders">
              <List className={styles.headerLinks}>
                <HeaderLinks />
              </List>
            </nav>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerLinks />
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "var(--main-bg)",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

MiniDrawer.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default MiniDrawer;
