
import styles from './FirstPage.css';
import SearchBox from './search/SearchBox';
import Commodity from './commodity/commodity'
import Special from './special/Special'
import { Anchor } from 'antd';
import Boom from './boom/boom'
const { Link } = Anchor;
export default function FirstPage() {
  return (
    <div className={styles.normal}>
      <Anchor className={styles.anchor}>
        <Link href="#top" title="顶端" />
        <Link href="#commodity" title="轮播图"  />
        <Link href="#special" title="特价图书" />
        <Link href="#boom" title="畅销图书" />
      </Anchor>
      <SearchBox/>
      <Commodity />
      <Special className="API"/>
      <Boom />
    </div>
  );
}
