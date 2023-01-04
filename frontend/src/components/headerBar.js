import React, { useState } from 'react';
import '../css/headerBar.css'
import logo from './logo.png';
import { MailOutlined, LoginOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons'
// import 'antd/dist/antd.css';
import { Dropdown, Button, Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const testItems = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const unLogInItems = [
  {
    label: 'log in',
    key: 'logIn',
    icon: <LoginOutlined />
  },
  {
    label: 'sign up',
    key: 'signUp',
    icon: <EditOutlined />
  }
]

const logInItems = [
  {
    label: 'log out',
    key: 'logOut',
    icon: <LogoutOutlined />
  },
  {
    label: 'edit my profile',
    key: 'editProfile',
    icon: <EditOutlined />
  }
]

const HeaderBar = ({ authenticated, handleOnClickMail ,handleOnClickLogInOut }) => {
  const items = authenticated ? logInItems : unLogInItems;
  // const items = testItems;
  const [current, setCurrent] = useState("");

  const onClick = (key) => {
    setCurrent(key);
    handleOnClickLogInOut(key);
  }

  return (
    <header className='headerBarContainer'>
      <div className='brandContainer'>
        <div className='logoContainer'>
          <img alt='logo' src={logo} />
          <div id="brandNameContainer">
            <div>NTU</div>
            <div>OUTSIDER</div>
          </div>
        </div>
      </div>

      <div className='toolBarContainer'>
        <div className='tools'>
          <div className='mail'>
            <MailOutlined
              className='toolsMail'
              onClick={handleOnClickMail}
            />
          </div>
          <div className='logIn'>
            <Menu
              className='toolsMenu'
              onClick={(e) => onClick(e.key)}
              // selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar;