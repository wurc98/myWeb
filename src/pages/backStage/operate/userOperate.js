
import styles from './userFind.css';
import { Table, Form, Row, Col, Input, Button, Icon, DatePicker, TimePicker } from 'antd'
import React, { Component } from 'react';
import { connect } from 'dva'

const { MonthPicker, RangePicker } = DatePicker;


@connect(
  state => ({
    allUsers: state.user
  })
)
class userFind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
    }
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Form.create()(userFind);