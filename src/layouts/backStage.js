import React, { Component } from 'react';
import styles from './index.css'
import { Layout, Menu, Button, Icon, Switch } from 'antd';
import Link from 'umi/link'
import Header from '../pages/header/Header.js'
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            theme: 'dark',
            current: '1'
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        console.log(this.props.children)
        return (
            <div>
                <Layout>
                    <Header />
                    <Layout className={styles.content}>
                        <Sider width={200} style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                        }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                inlineCollapsed={this.state.collapsed}
                                onClick={this.handleClick}
                                theme={this.state.theme}
                            >
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="heart" />
                                            用户管理
                                    </span>
                                    }
                                >
                                    <Menu.Item key="3">
                                        <Link to='/backStage/operate/userFind'>用户管理</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                            <Icon type="account-book" />
                                            书籍管理
                                    </span>
                                    }
                                >
                                    <Menu.Item key="8">
                                        <Link to='/backStage/operate/books/changedBooks'>书籍操作</Link>
                                    </Menu.Item>
                                    <Menu.Item key="7">
                                        <Link to='/backStage/operate/books/addBooks'>书籍添加</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to='/backStage/operate/books/specialBooks'>特价图书管理</Link>
                                    </Menu.Item>
                                    <Menu.Item key="5">
                                        <Link to='/backStage/operate/books/boomBooks'>畅销图书管理</Link>
                                    </Menu.Item>
                                    
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={
                                        <span>
                                            <Icon type="shopping-cart" />
                                            订单管理
                                    </span>
                                    }
                                >
                                    <Menu.Item key="9">
                                        <Link to='/backStage/operate/orders/orders'>订单管理</Link>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px', marginLeft: 200 }}>
                            <Switch
                                checked={this.state.collapsed === false}
                                onChange={this.toggleCollapsed}
                                checkedChildren="收回"
                                unCheckedChildren="展开"
                                className={styles.collapsed}
                            />
                            <Switch
                                checked={this.state.theme === 'dark'}
                                onChange={this.changeTheme}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                                className={styles.theme}
                            />
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 549,
                                    position: "relative"
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}