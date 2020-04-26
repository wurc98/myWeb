
import styles from './userFind.css';
import {
  Table, Form, Row, Col, Input, Button, Icon, DatePicker, message, Popconfirm
} from 'antd'
import React, { Component } from 'react';
import { connect } from 'dva'
@connect(
  state => ({
    allUsers: state.user
  })
)
class userFind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,  //展开收起

      //新增用户表单
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'user/allUsers', payload: {} })
  }
  getFields() {

    const config = {
      rules: [{ type: 'object' }],
    };
    const count = this.state.expand ? 3 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const title = [
      {
        label: '用户id',
        value: '_id'
      },
      {
        label: '用户名',
        value: 'username'
      },
      {
        label: '账号',
        value: 'account'
      }
    ]
    for (let i = 0; i < title.length; i++) {
      if (i == 2) {
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <Form.Item label={title[i].label}>
              {getFieldDecorator(title[i].value, config)(<DatePicker placeholder='请选择时间' />)}
            </Form.Item>
          </Col>)
        continue
      }
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
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'date': fieldsValue['date'] ? fieldsValue['date'].format('YYYY-MM-DD') : null
      };
      console.log('Received values of form: ', values);
      for (let value in values) {
        console.log(value)
        if (values[value] == '') {
          values[value] = undefined
        }
      }
      console.log(values)
      this.props.dispatch({ type: 'user/allUsers', payload: values })
    });
  };

  handleReset() {
    this.props.form.resetFields();
  };

  toggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  //修改，新增窗口
  handleOk() {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel() {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  //新增窗口表单
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleConfirmBlur(e) {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  //确认删除回调函数
  confirm(record) {
    console.log(record);
    this.props.dispatch({ type: 'user/removeUser', payload: record }).then(()=>{
      this.props.dispatch({ type: 'user/allUsers', payload: {} })
    }).catch(err=>{
      message.info(err)
    })
  }
  //取消删除回调函数
  cancel(e) {
    console.log(e);
    message.error('已取消');
  }


  render() {
    const dataSource = this.props.allUsers
    const columns = [
      {
        title: '用户id',
        dataIndex: '_id',
        key: '_id',
        width: 220
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 180
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: '注册时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="你确定要删除这条用户信息吗?"
              onConfirm={this.confirm.bind(this, record, text)}
              onCancel={this.cancel.bind(this)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" className={styles.tableBtn}>
                删除
              </Button>
            </Popconfirm>

          </span>
        )
      }
    ];

    //新增表单


    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)}>
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
          key={dataSource.key}
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

export default Form.create()(userFind);