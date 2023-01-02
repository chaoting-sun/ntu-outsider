import React, { useState } from 'react';
import '../css/headerBar.css'
import logo from './logo.png';
import { MailOutlined, LoginOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons'
// import 'antd/dist/antd.css';
import { Dropdown, Button, Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';


const unLogInItems = [
  {
    label: 'log in',
    key: 'logIn',
    icon: <LoginOutlined />
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

const HeaderBar = ({ authenticated, handleOnClickLogInOut }) => {
  const items = authenticated ? logInItems : unLogInItems;

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
            <MailOutlined />
          </div>
          <div className='logIn'>
            <Menu
              className='toolsMenu'
              onClick={() => handleOnClickLogInOut()}
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