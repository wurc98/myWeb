
import styles from './safetyCenter.css';
import {Form,Input,Tooltip,Icon,Button} from 'antd'

import React, { Component } from 'react'

class ChangeUserInfo extends Component{
  constructor(props){
    super(props)
  }
  handleSubmit(){
    console.log(123)
  }
  render(){
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
        <div  className={styles.loginFrom}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
             <Form.Item label={
                <span>
                  昵称&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }>
                <Input  defaultValue={userInfo.username}/>
             </Form.Item>
             <Form.Item label={
                <span>
                  个性签名&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }>
                <Input  defaultValue={userInfo.label}/>
             </Form.Item>
             <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                保存
                </Button>
            </Form.Item>
          </Form>
        </div>
      )
  }
}


export default Form.create()(ChangeUserInfo);
