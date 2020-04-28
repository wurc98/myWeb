
import styles from './_search.css';
import {Form,Button,Row,Col,Icon,Input} from "antd";
import {connect} from "dva"
import React, { Component } from 'react';
@connect()
class BooksSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      expand: true,  //展开收起
      //搜索框样式
      serachStyle: true,
    }
  }
  handleSearch=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', fieldsValue);
      for (let value in fieldsValue) {
        console.log(value)
        if (fieldsValue[value] == '') {
          fieldsValue[value] = undefined
        }
      }
      console.log(fieldsValue)
      this.props.dispatch({ type: 'stage/allBooks', payload: fieldsValue })
    });
  };
  //清空函数
  handleReset=()=> {
    this.props.form.resetFields();
  };
  //展开收起函数
  toggle=()=> {
    const { expand, serachStyle } = this.state;
    this.setState(
      {
        expand: !expand,
        serachStyle: !serachStyle
      }
    );
  };
  //搜索框
  getFields=()=> {
    const config = {
      rules: [{ type: 'object' }],
    };
    const count = this.state.expand ? 3 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const title = [
      {
        label: '书籍id',
        value: '_id'
      },
      {
        label: '书名',
        value: 'name'
      },
      {
        label: '作者',
        value: 'author'
      },
      {
        label: '语言',
        value: 'language'
      },
      {
        label: '出版社',
        value: 'press'
      }
    ]
    for (let i = 0; i < title.length; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={title[i].label}>
            {getFieldDecorator(title[i].value, {
              rules: [],
            })(<Input placeholder="请输入..." />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }
  render(){
    return (
      <div className={styles.normal}>
        <Form className={styles.form} style={this.state.serachStyle ? {
              "padding": " 10px"
            } : {
                "background": "white", "boxShadow": "-4px 20px 20px 0px #a2a2a247",
                "padding": " 10px"
              }} onSubmit={this.handleSearch}>
              <Row gutter={24}>{this.getFields()}</Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    清空
                 </Button>
                  <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                    {this.state.expand ? '展开' : '收起'} <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                </Col>
              </Row>
            </Form>
      </div>
    );
  }
}

export default Form.create()(BooksSearch);