
import React, { Component } from 'react';
import styles from './addBooks.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'dva'
import imageUrl from '../../../../assets/img/defaultCover.jpg'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  DatePicker,
  Upload,
  message
} from 'antd';
const { TextArea } = Input;


@connect()
class addBooks extends Component {
  constructor(props) {
    super(props)
    this.state={
      imageUrl:imageUrl,
      loading:false,
      name:''
    }
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      const values = {
        ...fieldsValue,
        'pubtime': fieldsValue['pubtime'].format('YYYY-MM-DD'),
      };
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({name:values.name})
        this.props.dispatch({ type: 'stage/addBooks', payload: values })
      }
    });
  };
  normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  //文件上传
  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  handleChange(info){
    if(!this.state.name){
      message.error('请先提交书籍信息！！！')
      return
    }
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      axios({
        method: "post",
        url: "http://localhost:7001/stage/bookImg",
        data: {
          name: this.state.name
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        console.log(res)
        localStorage.setItem('userImg', 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')))
      }).catch((Error) => {
        message.info(Error)
      })
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        }),
      );
    }
  };
  requetData(){
    return {
      name:this.state.name
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
    const props = {
      name: "avatar",
      className: styles.img,
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false,
      action: `http://localhost:7001/stage/upload`,
      method: "post",
      headers: {
        "x-csrf-token": Cookies.get('csrfToken')
      },
      data: this.requetData.bind(this),
      beforeUpload:this.beforeUpload.bind(this),
      onChange: this.handleChange.bind(this)
    }
    return (
      <div className={styles.normal}>
        <div className={styles.img}>
          <Upload {...props}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" title="点击更换图片" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
        <div className={styles.form}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item
              label={
                <span>
                  书名&nbsp;
                <Tooltip title="What do you want others to call your book?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of a book!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  作者&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('author', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  语言&nbsp;
                <Tooltip title="What do you want others to call your book?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('language', {
                rules: [{ required: true, message: 'Please input the title of a book!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  出版社&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('press', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="出版时间">
              {getFieldDecorator('pubtime', {
                rules: [{ type: 'object', required: true, message: 'Please select time!' }]
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  定价&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  描述&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('info', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<TextArea />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
            </Button>
            </Form.Item>
          </Form>
        </div>
        

      </div>
    );
  }
}


export default Form.create()(addBooks)