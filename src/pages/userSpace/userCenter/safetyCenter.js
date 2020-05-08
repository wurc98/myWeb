
import styles from './safetyCenter.css';
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'dva'
import ChangePasswd from './changePasswd'

@connect()
class ChangeUserInfo extends Component {
  constructor(props) {
    super(props)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          account: JSON.parse(localStorage.info).account,
          ...values
        }
        console.log(data)
        this.props.dispatch({ type: "user/updateInfo", payload: data })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const userInfo = JSON.parse(localStorage.info)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <div className={styles.loginFrom}>
        <h1>修改个人信息</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={
              <span>
                昵称&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入昵称!',
                    },
                  ],
                  initialValue: userInfo.username
                })(<Input />)}
            </Form.Item>
            <Form.Item label={
              <span>
                个性签名&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {getFieldDecorator('label', { initialValue: userInfo.label })(<Input />)}
            </Form.Item>
            <Form.Item label={
              <span>
                地址&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {getFieldDecorator('address', { initialValue: userInfo.address })(<Input />)}
            </Form.Item>
            <Form.Item label={
              <span>
                手机号码&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }>
              {getFieldDecorator('phone', { 
                initialValue: userInfo.phone,
                rules:[
                  {
                    required: true,
                    message: '请输入手机号码!',
                  },
                  { pattern: new RegExp(/^1[3456789]\d{9}$/), message:"手机号码格式不正确"},
                  ]})(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                保存
             </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.changePasswd}>
          <h1>修改密码</h1>
          <ChangePasswd />
        </div>
      </div>
    )
  }
}


export default Form.create()(ChangeUserInfo);
