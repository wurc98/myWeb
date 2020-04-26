
import styles from './index.css';//样式以对象的形式引入
import Header from './header/Header'
import FirstPage from './firstPage/FirstPage'
import Foot from './foot/foot'
export default function() {
  return (
    <div className={styles.normal}>
      <Header />
      <FirstPage />
      <Foot />
    </div>
  );
}
