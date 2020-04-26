
import styles from './changePasswd.css';
import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import { connect } from "dva"

@connect()
class changePasswd extends Component {
  constructor(props) {
    super(props)
    this.state={
      confirmDirty: false
    }
  }
  handleSubmit = e => {
    console.log(1111111)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          account: JSON.parse(localStorage.info).account,
          ...values
        }
        console.log(data)
        this.props.dispatch({ type: "user/changePasswd", payload: data })
      }
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('passwd')) {
      callback('您输入的两个密码不一致!');
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
      <div className={styles.normal}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator('passwd', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码！',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认新密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认新密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确定
             </Button>
            </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(changePasswd);
