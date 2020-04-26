
import styles from './FirstPage.css';
import SearchBox from './search/SearchBox';
import Commodity from './commodity/commodity'
import Special from './special/Special'
import Boom from './boom/boom'
export default function FirstPage() {
  return (
    <div className={styles.normal}>
        <SearchBox />
        <Commodity />
        <Special />
        <Boom />
    </div>
  );
}
