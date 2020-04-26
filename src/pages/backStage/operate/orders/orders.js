
import styles from './orders.css';
import { Table, Input, InputNumber, Popconfirm, Form , Button, Icon, message} from 'antd';
import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';
import { connect } from 'dva';
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
    allOrders: state.userOrders
  })
)
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      searchText: '',
      searchedColumn: '',
    };
  }

  //搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
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
  componentDidMount() {
    this.props.dispatch({ type: 'userOrders/userOrders', payload: {account:'zhangsan'} })
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
      const newData = [...this.props.allOrders];
      const index = newData.findIndex(item => _id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData[index])
        this.setState({ editingKey: '' });
      } else {
        newData.push(row);
        console.log(newData)
        this.setState({ editingKey: '' });
      }
    });
  }

  edit(_id) {
    console.log(_id)
    this.setState({ editingKey: _id });
  }
  delete(_id){
    this.props.dispatch({type:'stage/removeOrder',payload:{"_id":_id}}).then(res=>{
      this.props.dispatch({ type: 'userOrders/userOrders', payload: { account: 'zhangsan' } })
    }).catch(err=>{
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
        title: '订单号',
        dataIndex: '_id',
        width:'20%',
        ...this.getColumnSearchProps('_id'),
      },
      {
        title: '账号',
        dataIndex: 'account',
        ...this.getColumnSearchProps('account'),
      },
      {
        title: '书名',
        dataIndex: 'name',
        editable: true,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: "数量",
        dataIndex: "num",
        editable: true
      },
      {
        title: "手机号码",
        dataIndex: "phone",
        editable: true,
        width:'12%',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '25%',
        editable: true,
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
                  <a
                    onClick={() => this.save(form, record._id)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
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

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.props.allOrders}
          columns={columns1}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(Order);