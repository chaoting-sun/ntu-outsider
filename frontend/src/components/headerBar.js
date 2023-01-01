import React, { useState } from 'react';
import '../css/headerBar.css'
import logo from './logo.png';
import { MailOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
// import 'antd/dist/antd.css';
import { Dropdown, Button, Menu } from 'antd';
import { Navigate } from 'react-router-dom';


const logInItem = {
  label: 'log in',
  key: 'logIn',
  icon: <LoginOutlined />
}

const logOutItem = {
  label: 'log out',
  key: 'logOut',
  icon: <LogoutOutlined />
}

const items = [
  {
    label: 'log in',
    key: 'logIn',
    icon: <LoginOutlined />
  },
  {
    label: 'log out',
    key: 'logOut',
    icon: <LogoutOutlined />
  },

]

const HeaderBar = ({authenticated, handleOnClickLogInOut}) => {
  const items = [
    authenticated ? (
      logOutItem
    ) : (
      logInItem
    )
  ]

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