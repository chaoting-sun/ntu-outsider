import React from 'react';
import { AppstoreOutlined, SettingOutlined, MailOutlined, HeartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../css/menuBar.css';
import UserAddOutlined from '@ant-design/icons';
import SearchBox from './searchBox';


// antd: menu
// ref: https://ant.design/components/menu

const items = [
  { label: "珍藏", key: "savedPostPage" },
  { label: "追蹤", key: "followedPostPage" },
  { label: "我的貼文", key: "myPostPage" },
]

const MenuBar = ({ handleConditionedSearch, handleMenuNavigate }) => {
  return (
    <aside className='sideLayoutSider'>
      <div className='sideLayoutSiderChildren'>
        <SearchBox handleConditionedSearch={handleConditionedSearch} />
        <div className='menuContainer'>
          <Menu
            onClick={(e) => handleMenuNavigate(e.key)}
            style={{
              color: "#4a3935",
              fontSize: '1.15em',
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