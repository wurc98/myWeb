import Login from 'ant-design-pro/lib/Login';
import styles from './AdministratorLogin.css'
import { connect } from 'dva'
import React,{Component} from 'react'
const {UserName, Password,  Submit } = Login;

@connect()
class AdministratorLogin extends Component {
  constructor(props){
    super(props)
  }
  onSubmit (err, values){
    if(!err){
      this.props.dispatch({type:"user/backStageLogin",payload:values})
    }
  };
  render() {
    return (
      <div>
        <div className={styles.loginFrom}>
        <p>管理员登录~</p>
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
export default AdministratorLogin