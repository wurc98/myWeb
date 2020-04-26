import React, { Component } from 'react';
import Login from 'ant-design-pro/lib/Login';
import styles from './login.css'
import Header from '../header/Header'
import { connect } from 'dva'
const {UserName, Password,  Submit } = Login;

@connect()
class LoginDemo extends Component {
  constructor(props){
    super(props)
  }
  onSubmit (err, values){
    if(!err){
      this.props.dispatch({type:"user/login",payload:values})
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className={styles.loginFrom}>
        <p>欢迎登录~</p>
        <Login
          onSubmit={this.onSubmit.bind(this)}
        >
            <UserName name="account" 
            placeholder='请输入账号'
            rules={[{required:true,message:'请输入账号'}]}
            />
            <Password name="passwd" 
            placeholder='请输入密码'
            />
          <Submit className={styles.loginBtn}>登录</Submit>
        </Login>
      </div>
      </div>
    );
  }
}
export default LoginDemo