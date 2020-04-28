
import styles from './commodity.css';
import Nav from './nav/Nav'
import { Carousel } from 'antd';
export default function() {
  let imgList=[
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg'
  ]
  return (
    <div className={styles.normal}>
      <Nav />
      <div className={styles.body}>
          <div className={styles.advers}></div>
          <div className={styles.books_one}>
            <div className={styles.one_left}>
              <div className={styles.title} id="commodity">图书分类</div>
              <div className={styles.booksList}>
                <span>特色书单</span>
              </div>
            </div>
            <div className={styles.one_mid}>
              <div className={styles.trotting_box}>
                <Carousel autoplay>
                  {
                    imgList.map((item,index)=>{
                      return (<img key={item + index} src={item} />)
                    })
                  }
                </Carousel>
              </div>
            </div>
            <div className={styles.one_right}>
              
            </div>
          </div>
      </div>
    </div>
  );
}
