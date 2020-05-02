
import styles from './specialBooks.css';
import {
  Table, Input, InputNumber, Popconfirm,Drawer , Form, Row, Col, Button, Icon, message
} from 'antd'
import React, { Component } from 'react';
import { connect } from 'dva'
import Highlighter from 'react-highlight-words';
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
    allBooks: state.stage,
    specialList: state.special,
  })
)
class SpeicalBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //新增用户表单
      editingKey: "",
      addSpecials:[]
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'special/special', payload: {} })
  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          清空
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  

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
      const newData =this.props.specialList
      console.log(newData)
      const index = newData.findIndex(item => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData[index])
        this.props.dispatch({ type: 'special/seckill', payload: newData[index] }).then(() => {
          this.props.dispatch({ type: 'special/special', payload: {} })
        })
        this.setState({ editingKey: '' });
      } else {
        newData.push(row);
        this.props.dispatch({ type: "special/seckill", payload: newData }).then(() => {
          this.props.dispatch({ type: 'special/special', payload: {} })
        })
        this.setState({ editingKey: '' });
      }
    });
  }

  edit(_id) {
    this.setState({ editingKey: _id });
  }
  delete(_id) {
    this.props.dispatch({ type: 'special/removeSpecial', payload: { "_id": _id } }).then(res => {
      this.props.dispatch({ type: 'special/special', payload: {} })
    }).catch(err => {
      message.info(err)
    })
  }

  showDrawer = () => {
    this.props.dispatch({ type: 'stage/allBooks', payload: {} })
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  addSpecials=()=>{
    this.props.dispatch({type:'special/addSpecials', payload: this.state.addSpecials }).then(res=>{
      this.props.dispatch({ type: 'special/special', payload: {} })
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
        ...this.getColumnSearchProps('_id'),
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        ...this.getColumnSearchProps('author'),
      },
      {
        title: '书籍描述',
        dataIndex: 'info',
        key: 'info',
        ellipsis: true,
      },
      {
        title: '特价',
        dataIndex: 'seckill',
        key: 'seckill',
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



    const columns2 = [
      {
        title: '书籍id',
        dataIndex: '_id',
        key: '_id',
        width: 220,
        ...this.getColumnSearchProps('_id'),
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        ...this.getColumnSearchProps('author'),
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    //抽屉select
    const rowSelection2 = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          addSpecials:selectedRows
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className={styles.normal}>
        <Button type="primary" style={{"marginBottom":"10px"}} onClick={this.showDrawer}>新增</Button>
        <EditableContext.Provider value={this.props.form}>
          <Table
            rowSelection={rowSelection} 
            components={components}
            dataSource={this.props.specialList}
            className={styles.table}
            bordered
            columns={columns1}
            tableLayout="fixed"
            pagination={{  // 分页
              simple: true,
              pageSize: 6
            }}
          />
        </EditableContext.Provider>
        <Drawer
          title="全部图书数据"
          placement="right"
          width={720}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Table
            rowSelection={rowSelection2} 
            dataSource={this.props.allBooks}
            className={styles.table}
            bordered
            columns={columns2}
            tableLayout="fixed"
            pagination={{  // 分页
              simple: true,
              pageSize: 8
            }}
          />
          <Button type="primary" className={styles.add} onClick={this.addSpecials}>确定</Button>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(SpeicalBooks);