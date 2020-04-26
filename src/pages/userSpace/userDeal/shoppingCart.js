
import styles from './shoppingCart.css';
import React, { Component } from 'react';
import Position from '../../../assets/js/position'
import { Cascader, Table, Button, InputNumber } from 'antd';
import { connect } from 'dva';
@connect(
  state => ({
    cartInfo: state.shoppingCart,
  })
)
@connect()
class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      totalPrice: 0,
      goods:[]
    };
  }
  start() {
    this.setState({ loading: true });
    // ajax request after empty completing
    
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange(selectedRowKeys) {
    this.setState({
      goods:this.props.cartInfo
    })
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    var price = 0;
    selectedRowKeys.forEach(el => {
      console.log(this.state.goods)
      price = this.props.cartInfo[el].price * this.props.cartInfo[el].num + price
    })
    this.setState({ totalPrice: price })
  };
  componentDidMount() {
    this.props.dispatch({ type: 'shoppingCart/getCart', payload: { account: JSON.parse(localStorage.info).account } })    
  }
  onChange(value) {
    console.log(value);
  }
  deletePro(value) {
    console.log(value)
  }
  changePage() {

  }
  onChangeNum(name, value) {
    console.log('changed', value, name);
    this.props.dispatch({ type: 'shoppingCart/updateNum', payload: { account: JSON.parse(localStorage.info).account, name, num: value } }).then((res)=>{
      this.props.dispatch({ type: 'shoppingCart/getCart', payload: { account: JSON.parse(localStorage.info).account } }) 
    })
  }
  render() {
    console.log(1)
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品信息',
        dataIndex: 'info',
      },
      {
        title: '数量',
        dataIndex: 'num',
        render: (text, record) => (
          <span>
            <InputNumber defaultValue={record.num} onChange={this.onChangeNum.bind(this, record.name)} />
          </span>
        )
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={this.deletePro.bind(this, record.name)}>删除</a>
          </span>
        ),
      }
    ];
    const data = this.props.cartInfo;


    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className={styles.normal}>
        <div className={styles.address}>
          收获地址：<Cascader
            defaultValue={['湖南省', '益阳市', '桃江县']}
            expandTrigger={"click"}
            options={Position}
            onChange={this.onChange}
          />
        </div>
        <div className={styles.pro}>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={this.start.bind(this)} disabled={!hasSelected} loading={loading}>
              结算
          </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `已选 ${selectedRowKeys.length} 件，总价：${this.state.totalPrice}` : ''}

            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{  // 分页
              simple: true,
              pageSize: 5,
              onChange: this.changePage.bind(this),
            }}
          />
        </div>
      </div>
    )
  }
}

export default ShoppingCart;