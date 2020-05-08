
import styles from './Header.css'
import Link from 'umi/link'
import React from 'react'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import headImg from '../../assets/img/headImg.jpg';
import { Menu, Dropdown, Icon ,message } from 'antd';
import router from 'umi/router'
export default function Header () {
  let info={};
  let AdministratorInfo={};
  if(typeof localStorage.info == 'string'){
    info=JSON.parse(localStorage.info)
  };
  if(typeof localStorage.AdministratorInfo == 'string'){
    AdministratorInfo=JSON.parse(localStorage.AdministratorInfo)
  };
  console.log(AdministratorInfo)
  const onClick = ({ key }) => {
    if(key==2){
      localStorage.clear();
      router.push('/')
      message.info(`已退出！！！`);
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">
        <Link to='/userSpace'>个人空间</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu onClick={onClick}>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.normal} id="top">
        <div className={styles.leftBox}>
            <Link to='/' className={styles.a}>罄竹商城网 </Link>
            <Link to='/users' className={styles.a}>罄竹阅读网</Link>
        </div>
        <div className={styles.middleBox}>
            <p>欢迎您来到罄竹书城！</p>
        </div>
        {
          info.username?(<div className={styles.rightBox}>
              <img src={
                localStorage.userImg?localStorage.userImg:headImg
              } className={styles.headImg}/>
              <div className={styles.userInfo}>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    {info.username}<Icon type="down" />
                  </a>
                </Dropdown>
              </div>
              <div className={styles.message}><NoticeIcon count={3}/></div>
          </div>)
          :AdministratorInfo.username?(
            <div className={styles.rightBox}>
              <div className={styles.rightBox}>
                <img src={
                  localStorage.userImg?localStorage.userImg:headImg
                } className={styles.headImg}/>
                <div className={styles.userInfo}>
                  <Dropdown overlay={menu2}>
                    <a className="ant-dropdown-link" href="#">
                      {AdministratorInfo.username}<Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          ):(
            <div className={styles.rightBox}>
              <Link className={styles.login} to='/login'>登录</Link>
              <Link className={styles.reg} to='/reg'>注册</Link>
            </div>
          )
          
        }
        
    </div>
  );
}