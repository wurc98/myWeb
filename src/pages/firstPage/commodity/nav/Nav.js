
import styles from './Nav.css';
import React, { useState } from 'react'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default function Nav() {
  const [state, setState] = useState({
    current: 'mail'
  })
  const handleClick = e => {
    console.log('click ', e);
    setState({
      current: e.key,
    });
  };
  const navList = [
    "文学",
    "计算机",
    "通信",
    "教育",
    "科普",
    "幼儿启蒙",
    "期刊"
  ]
  return (
    <div className={styles.normal}>
      <ul>
        <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
          {
            navList.map((item, index) => {
              return (
                <SubMenu
                  key={item + index}
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="setting" />
                      {item}
                    </span>
                  }
                >
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </SubMenu>
              )
            })
          }
        </Menu>
      </ul>
    </div>
  );
}
