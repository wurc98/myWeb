
import styles from './booksFind.css';
import {
  Table, Input, InputNumber, Popconfirm, Form, Row, Col, Button, Icon
} from 'antd'
import React, { Component } from 'react';
import { connect } from 'dva'
@connect(
  state => ({
    allBooks: state.stage
  })
)
class booksFind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: true,  //展开收起
      //搜索框样式
      serachStyle: true
      //新增用户表单
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'stage/allBooks', payload: {} })
  }

  handleSearch(e) {
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
  handleReset() {
    this.props.form.resetFields();
  };
  //展开收起函数
  toggle() {
    const { expand, serachStyle } = this.state;
    this.setState(
      {
        expand: !expand,
        serachStyle: !serachStyle
      }
    );
  };
  //搜索框
  getFields() {
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



  render() {
    const dataSource = this.props.allBooks
    const columns = [
      {
        title: '书籍id',
        dataIndex: '_id',
        key: '_id',
        width: 220
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        width: 120
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '书籍描述',
        dataIndex: 'info',
        key: 'info',
        ellipsis: true
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 80,
        ellipsis: true
      },
      {
        title: '出版时间',
        dataIndex: 'pubtime',
        key: 'pubtime',
        ellipsis: true
      },
      {
        title: '出版社',
        dataIndex: 'press',
        key: 'press',
        ellipsis: true
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>

          </span>
        )
      }
    ];
    //新增表单
    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Form className={styles.form} style={this.state.serachStyle ? {
            "padding": " 10px"
          } : {
              "background": "white", "boxShadow": "-4px 20px 20px 0px #a2a2a247",
              "padding": " 10px"
            }} onSubmit={this.handleSearch.bind(this)}>
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
                  清空
               </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle.bind(this)}>
                  {this.state.expand ? '展开' : '收起'} <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          dataSource={dataSource}
          className={styles.table}
          bordered
          columns={columns}
          tableLayout="fixed"
          pagination={{  // 分页
            simple: true,
            pageSize: 4
          }}
        />
      </div>
    );
  }
}

export default Form.create()(booksFind);