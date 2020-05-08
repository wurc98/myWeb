import axios from 'axios'
import styles from './userInfo.css';
import { useState } from 'react';
import { Icon, Upload, message, Input, Descriptions } from 'antd';
import Cookies from 'js-cookie'
import headImg from '../../../assets/img/headImg.jpg';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
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
export default function () {
  const [loading, setLoading] = useState({ loading: false, imageUrl: localStorage.userImg ? localStorage.userImg : headImg })
  const [label,setLabel] = useState({
    label:false,
  })
  const [labelInput,setLabelInput] = useState({
    labelInput:false,
  })
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      axios({
        method: "post",
        url: "http://localhost:7001/userImg",
        data: {
          account: JSON.parse(localStorage.info).account
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        console.log(res)
        localStorage.setItem('userImg', 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')))
      }).catch((Error) => {
        message.info(Error)
      })
      getBase64(info.file.originFileObj, imageUrl =>
        setLoading({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  const requetData = function () {
    
    return {
      account: JSON.parse(localStorage.info).account
    }
  }
  const uploadButton = (
    <div>
      <Icon type={loading.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const { imageUrl } = loading;
  const props = {
    name: "avatar",
    className: styles.img,
    listType: "picture-card",
    className: "avatar-uploader",
    showUploadList: false,
    action: `http://localhost:7001/upload`,
    method: "post",
    headers: {
      "x-csrf-token": Cookies.get('csrfToken')
    },
    data: requetData,
    beforeUpload: beforeUpload,
    onChange: handleChange
  }
  const userInfo = JSON.parse(localStorage.info)

  //控制个性签名输入框函数

  return (
    <div className={styles.normal}>
      <div className={styles.infoBox}>
        <div>
          <div className={styles.imgBox}>
            <Upload {...props} className={styles.imgBox2}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" title="点击更换图片" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <p style={{ padding: "0 20px" }}>{userInfo.label?userInfo.label:"这个人很懒~"}</p>
          </div>
          <div className={styles.info_Box}>
            <Descriptions title="用户信息">
              <Descriptions.Item label="用户名">{userInfo.username}</Descriptions.Item>
              <Descriptions.Item label="手机号码">{userInfo.phone}</Descriptions.Item>
              <Descriptions.Item label="注册年龄">{userInfo.date}</Descriptions.Item>
              <Descriptions.Item label="住址">
                {userInfo.address?userInfo.address:"未填写地址"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </div>
  );
}
