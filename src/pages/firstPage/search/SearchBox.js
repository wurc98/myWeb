
import styles from './SearchBox.css';
import { Input } from 'antd';
import "antd/dist/antd.css";
import logo from '../../../assets/img/logo.png'
import React,{Component} from "react"
import router from "umi/router"


class SearchBox extends Component{
  constructor(props){
    super(props)
  }
  search=value=>{
    router.push("/products/"+value)
  }
  render(){
    const { Search } = Input;
    return (
      <div className={styles.normal}>
        <div className={styles.logo}>
            <img src={logo} />
            <div className={styles.search}>
              <Search
                placeholder="请输入..."
                enterButton="搜索"
                size="large"
                onSearch={this.search}
              />
            </div>
        </div>
      </div>
    );
  }
}
export default SearchBox
