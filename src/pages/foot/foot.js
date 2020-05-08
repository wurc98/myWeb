
import styles from './foot.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.foot}>
        <ul className={styles.li}>
          <li >
            <span className={styles.title}>
              正规渠道正品保障
            </span>
          </li>
          <li>
            <span className={styles.title2}>
              放心购物货到付款  
            </span>
          </li>
          <li>
            <span className={styles.title3}>
              上门退换购物无忧
            </span>
          </li>
          <li>
            <span className={styles.title4}>
              物流快速次日到达
            </span>
          </li>
          
        </ul>
      </div>
    </div>
  );
}
