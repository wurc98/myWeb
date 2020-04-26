
import styles from './SearchBox.css';
import { Input } from 'antd';
import "antd/dist/antd.css";
import logo from '../../../assets/img/logo.png'
export default function SearchBox() {
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
              onSearch={value => console.log(value)}
            />
          </div>
      </div>
    </div>
  );
}
