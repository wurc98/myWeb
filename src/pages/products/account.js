
import styles from './account.css';
import { Modal, Button ,InputNumber } from 'antd';
import code from '../../assets/img/code.png'
import React, { Component } from 'react';
const { confirm } = Modal;

class Account extends Component{
  constructor(props){
    super(props)
    this.state={
      num:1,
      money:0,
      visible: false,
    }
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };


  showConfirm=()=> {
    const that = this
    confirm({
      title: '是否确认支付订单?',
      content: `总价：￥${this.state.num*this.props.bookInfo.price}`,
      onOk() {
        console.log('OK');
        that.setState({
          visible:true
        })
      },
      onCancel() {
        console.log('Cancel');
      },
      okText:"确定",
      cancelText:"取消",
    });
  }
  changeNumber=(value)=>{
    this.setState({
      num:value
    })
  }
  render(){
    return (
      <div className={styles.normal}>
        <div>书名：{this.props.bookInfo.name}</div>
        <div>价格：{this.props.bookInfo.price}</div>
        <InputNumber  min={1} defaultValue={1} onChange={this.changeNumber}/><br/>
        <Button onClick={this.showConfirm}>确定</Button>
        <Modal
          visible={this.state.visible}
          title="请支付..."
          onCancel={this.handleCancel}
          footer={null}
          zIndex={1000}
        >
          <img style={{"width":"150px"}} src={code}/>
          总价：￥{this.state.num*this.props.bookInfo.price}
          <br/>
          <h2>祝您购物愉快~</h2>
        </Modal>
      </div>
    );
  }
}
export default Account