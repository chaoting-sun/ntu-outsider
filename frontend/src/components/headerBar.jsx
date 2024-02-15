import React, { useState } from "react";
import "../css/headerBar.css";
import logo from "./logo.png";
import {
  DownOutlined,
  SmileOutlined,
  MailOutlined,
  LoginOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
// import 'antd/dist/antd.css';
// import { Space, Dropdown, Menu } from 'antd';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";

import PathConstants from "../routes/pathConstants";

// dropdown
const dropdowItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const DropdownButton = styled(Button)`
  position: relative !important;
  height: 40px !important;
  min-width: 40px !important;
  max-width: 40px !important;
  border: none;
  padding: 0 !important;
  background-color: #a4a4a4 !important;
  border-radius: 50% !important;
  box-sizing: border-box !important;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: none !important;
    text-decoration: none;
    background-color: #5d6260 !important;
  }
`;

const unLogInItems = [
  {
    label: "log in",
    key: "logIn",
    icon: <LoginOutlined />,
  },
  {
    label: "sign up",
    key: "signUp",
    icon: <EditOutlined />,
  },
];

const logInItems = [
  {
    label: "log out",
    key: "logOut",
    icon: <LogoutOutlined />,
  },
  {
    label: "edit my profile",
    key: "editProfile",
    icon: <EditOutlined />,
  },
];

const MenuItems = ({ handleClose, authenticated }) => {
  if (authenticated) {
    return (
      <>
        <MenuItem onClick={() => handleClose("logOut")}>log out</MenuItem>
        <MenuItem onClick={() => handleClose("editProfile")}>
          edit my profile
        </MenuItem>
      </>
    );
  } else {
    return (
      <>
        <MenuItem onClick={() => handleClose("logIn")}>log in</MenuItem>
        <MenuItem onClick={() => handleClose("signUp")}>sign up</MenuItem>
      </>
    );
  }
};

const HeaderBar = ({
  authenticated,
  handleOnClickMail,
  handleOnClickLogInOut,
}) => {
  const items = authenticated ? logInItems : unLogInItems;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action) => {
    console.log("action:", action);
    setAnchorEl(null);
    handleOnClickLogInOut(action);
  };

  return (
    <header className="headerBarContainer">
      <div className="brandContainer">
        <div className="logoContainer">
          {/* <img alt='logo' src={logo} /> */}
          <div
            className="brandNameContainer"
            onClick={() => {
              navigate(PathConstants.MAIN);
            }}
          >
            <div>NTU</div>
            <div>OUTSIDER</div>
          </div>
        </div>
      </div>

      <div className="toolBarContainer">
        <div className="tools">
          <div className="mail">
            <MailOutlined className="toolsMail" onClick={handleOnClickMail} />
          </div>
          <div className="logIn">
            {/* <div className='logInButton'> */}
            <DropdownButton
              // className="toolsMenu"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></DropdownButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItems
                handleClose={handleClose}
                authenticated={authenticated}
              />
            </Menu>
            {/* </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
