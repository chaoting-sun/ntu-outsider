import React from 'react';
import { AppstoreOutlined, SettingOutlined, MailOutlined, HeartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../css/menuBar.css';
import UserAddOutlined from '@ant-design/icons';
import SearchBox from './searchBox';


// antd: menu
// ref: https://ant.design/components/menu

const items = [
  { label: "全部", key: "allPost" },
  { label: "追蹤", key: "followedPost" },
  { label: "我的貼文", key: "uploadedPost" },
  { label: "新增貼文", key: "editPost" },
]

const MenuBar = ({ handleQueryPost, handleMenuOperation }) => {
  return (
    <aside className='sideLayoutSider'>
      <div className='sideLayoutSiderChildren'>
        <SearchBox handleQueryPost={handleQueryPost} />
        <div className='menuContainer'>
          <Menu
            onClick={(e) => handleMenuOperation(e.key)}
            style={{
              color: "#4a3935",
              backgroundColor: "#e9e9e9",
              fontSize: '1.15em',
              width: 256,
              border: 'none'
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