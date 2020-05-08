
import styles from './booksFind.css';
import {
  Table, Input, InputNumber, Popconfirm, Form, Row, Col, Button, Icon, message
} from 'antd'
import React, { Component } from 'react';
import Search from './_search'
import { connect } from 'dva'
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


@connect(
  state => ({
    allBooks: state.stage
  })
)
class changeBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: true,  //展开收起
      //搜索框样式
      serachStyle: true,
      //新增用户表单
      editingKey: ""
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'stage/allBooks', payload: {} })
  }

  

  isEditing = record => record._id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, _id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log(row)
      const newData =this.props.allBooks
      console.log(newData)
      const index = newData.findIndex(item => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData[index])
        this.props.dispatch({ type: 'stage/updateBooks', payload: newData[index] }).then(() => {
          this.props.dispatch({ type: 'stage/allBooks', payload: {} })
        })
        this.setState({ editingKey: '' });
      } else {
        newData.push(row);
        this.props.dispatch({ type: "stage/updateBooks", payload: newData }).then(() => {
          this.props.dispatch({ type: 'stage/allBooks', payload: {} })
        })
        this.setState({ editingKey: '' });
      }
    });
  }

  edit(_id) {
    this.setState({ editingKey: _id });
  }
  delete(_id) {
    this.props.dispatch({ type: 'stage/removeBooks', payload: { "_id": _id } }).then(res => {
      this.props.dispatch({ type: 'stage/allBooks', payload: {} })
    }).catch(err => {
      message.info(err)
    })
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = [
      {
        title: '书籍id',
        dataIndex: '_id',
        key: '_id',
        width: 220,
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        width: 120,
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
        ellipsis: true,
        editable: true
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 80,
        ellipsis: true,
        editable: true
      },
      {
        title: '分类',
        dataIndex: 'classify',
        key: 'classify',
        width: 80,
        ellipsis: true,
        editable: true
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
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Popconfirm title="确定修改吗?" onConfirm={() => this.save(form, record._id)}>
                    <a style={{ marginRight: 8 }} >
                      保存
                  </a>
                  </Popconfirm>

                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record._id)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
              <span >
                <a onClick={() => this.edit(record._id)} disabled={editingKey !== ''} style={{ marginRight: 8 }}>
                  修改
                  </a>
                <Popconfirm title="确定删除吗?" onConfirm={() => this.delete(record._id)}>
                  <a disabled={editingKey !== ''}>
                    删除
                  </a>
                </Popconfirm>
              </span>
            );
        },
      },
    ];
    const columns1 = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'num' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    //新增表单
    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Search />
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            dataSource={this.props.allBooks}
            rowKey={record => record._id}
            className={styles.table}
            bordered
            columns={columns1}
            tableLayout="fixed"
            pagination={{  // 分页
              simple: true,
              pageSize: 4
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

export default Form.create()(changeBooks);