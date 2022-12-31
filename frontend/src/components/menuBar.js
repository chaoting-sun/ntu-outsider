import React from 'react';
import { AppstoreOutlined, SettingOutlined, MailOutlined, HeartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styled from 'styled-components';
import '../css/menuBar.css';
import UserAddOutlined from '@ant-design/icons';
import logo from './logo.png';


// antd: menu
// ref: https://ant.design/components/menu


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Chatbox', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'), getItem('Option 2', '2')
  ]),
  getItem('Liked Post', 'sub2', <HeartOutlined />, [
    getItem('Option 3', '3'), getItem('Option 4', '4')
  ]),
  getItem('Liked Post2', 'sub3', <HeartOutlined />, [])
]

// const items2 = [
//   getItem('Chatbox', 'sub1', <MailOutlined />, [
//     getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
//     getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
//   ]),
//   getItem('Navigation One', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//   ]),
//   getItem('Navigation Three', 'sub4', <SettingOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Option 11', '11'),
//     getItem('Option 12', '12'),
//   ]),
//   getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
// ];

// const LeftBarSider = styled.div`
//   background: #282945;
//   flex: 0 0 256px;
//   max-width: 256px;
//   min-width: 256px;
//   width: 256px;
//   z-index: 10;
// `
// const LeftBarSiderChildren = styled.div`
//   display: flex;
//   flex-column: column;
//   justify-content: space-between;
// `

// const BrandContainer = styled.div`
//   z-index: 1;
//   height: 78px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const MenuContainer = styled.div`
//   height: calc(100vh - 120px);
//   overflow-x: hidden;
//   flex: 1 1;
//   padding: 24px 0;
// `

// const ScrollbarContainer = styled.div`
//   position: relative;
//   height: 100%;
// `


const MenuBar = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <aside className='sideLayoutSider'>
      <div className='sideLayoutSiderChildren'>
        <div className='brandContainer'>
          <div className='logoContainer'>
            <img alt='logo' src={logo} />
            <div>NTU OUTSIDER</div>
          </div>
        </div>
        <div className='menuContainer'>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
      </div>
    </aside>
  );
};
export default MenuBar;