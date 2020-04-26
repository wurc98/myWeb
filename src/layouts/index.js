import React, { Component } from 'react';
import styles from './index.css'
import { Layout, Menu, Button, Icon , Switch } from 'antd';
import Header from '../pages/header/Header.js'
import Link from 'umi/link'
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
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            个人中心
                                    </span>
                                    }
                                >
                                    <Menu.Item key="1">
                                        <Link to='/userSpace'>个人信息</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to='/userSpace/userCenter/safetyCenter'>安全中心</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="heart" />
                                            我的收藏
                                    </span>
                                    }
                                >
                                    <Menu.Item key="3">商品收藏</Menu.Item>
                                    <Menu.Item key="4">店铺收藏</Menu.Item>
                                    <Menu.Item key="5">电子书收藏</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                            <Icon type="account-book" />
                                            我的钱包
                                    </span>
                                    }
                                >
                                    <Menu.Item key="6">优惠券劵/卡</Menu.Item>
                                    <Menu.Item key="7">余额</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={
                                        <span>
                                            <Icon type="shopping-cart" />
                                            我的交易
                                    </span>
                                    }
                                >
                                    <Menu.Item key="8">
                                    <Link to='/userSpace/userDeal/order'>我的订单</Link>
                                    </Menu.Item>
                                    <Menu.Item key="9">交易记录</Menu.Item>
                                    <Menu.Item key="10">
                                    <Link to='/userSpace/userDeal/shoppingCart'>购物车</Link>
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