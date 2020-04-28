
import styles from './boom.css';
import Link from 'umi/link'
import { Tabs } from 'antd'
const { TabPane } = Tabs;
export default function () {
  const callback = (key) => {
    console.log(key);
  }
  const ranking1 = [
    '时间简史',
    '管锥编',
    '谈艺录',
    '三毛流浪记',
    'xxx从入门到精通',
    'JavaScript设计模式',
    '穿过地平线',
    '厚黑学',
    '国富论',
    '资本论'
  ]
  const ranking2 = [
    '时间简史',
    '管锥编',
    '谈艺录',
    '三毛流浪记',
    'xxx从入门到精通',
    'JavaScript设计模式',
    '穿过地平线',
    '厚黑学',
    '国富论',
    '资本论'
  ]
  const products = [
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
    {
      img: "http://img3m6.ddimg.cn/61/33/1009943116-1_l_25.jpg",
      info: "人间失格 全本无删减 太宰治绝望的告白 收录 人间失格 斜阳 及绝笔之作 日本经典文学小说 现当代文",
      price: "1",
      name: "人间失格"
    },
  ]
  return (
    <div className={styles.normal}>
      <div className={styles.left}>
        <div className={styles.title}>
          <h3 id="boom">畅销商品</h3>
        </div>
        <div className={styles.boomPro}>
          {products.map(el => {
            return (
              <div className={styles.bookBox}>
                <Link to={`/products/` + el.name} className={styles.boxImg}>
                  <img src={el.img} />
                  <p>{el.name}</p>
                </Link>
                <p>{el.info}</p>
                <div className={styles.price}>{"特价 ￥：" + el.price}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <h3>畅销排行</h3>
        </div>
        <div className={styles.ranking}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="总榜" key="1">
              <ul>
                {
                  ranking1.map((el, index) => {
                    return (
                      <li className={styles.rankingLine}>
                        <Link to={'./products/' + el}>
                          <span className={styles.num} style={index < 3 ? { "color": "red" } : {}}>{index + 1}</span>
                          <span className={styles.bookname}>{el}</span>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </TabPane>
            <TabPane tab="科幻" key="2">
              <ul>
                {
                  ranking1.map((el, index) => {
                    return (
                      <li className={styles.rankingLine}>
                        <Link to={'./products/' + el}>
                          <span className={styles.num} style={index < 3 ? { "color": "red" } : {}}>{index + 1}</span>
                          <span className={styles.bookname}>{el}</span>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </TabPane>
            <TabPane tab="童书" key="3">
              Content of Tab Pane 3
              </TabPane>
          </Tabs>
          
          <div style={{"width":"100%",'height':"31px"}}>
              <p style={{"textAlign":"right","padding":"0 10px"}}>《《《 更多榜单</p>
          </div>
        </div>
      </div>
    </div>
  );
}
