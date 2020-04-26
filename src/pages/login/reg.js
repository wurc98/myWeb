import {
  Form,
  Input,
  Checkbox,
  Button,
  Tooltip,
  Icon
} from 'antd';
import styles from './login.css'
import { connect } from 'dva'
import React, { Component } from 'react'
import Header from '../header/Header'

@connect()
class RegDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkNick: true,
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          account: values.account,
          passwd: values.password,
          username: values.username,
          date: new Date
        }
        this.props.dispatch({ type: 'user/reg', payload:data})
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致 !');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
        <Header />
        <div className={styles.loginFrom}>
          <p>欢迎注册~</p>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="账号">
              {
                getFieldDecorator('account', {
                  rules: [
                    { pattern: new RegExp(/^[a-zA-z]\w{5,15}$/), message: '账号要求：字母、数字、下划线组成，字母开头，6-16位' },
                    {
                      required: true,
                      message: '请输入账号!',
                    },
                  ],
                })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  昵称&nbsp;
              <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(RegDemo);