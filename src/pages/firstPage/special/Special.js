import styles from './Special.css';
import Link from 'umi/link'
import {
  connect
} from "dva"
import React, { Component } from 'react';

@connect(state => ({ specialList: state.special }))
class Special extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.dispatch({ type: "special/special" })
  }
  render() {
    const products = [{
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
    console.log(this.props.specialList)
    return (<div className={styles.normal} >
      <div className={styles.title} >
        <h3 id="special" > 特价商品 </h3>
      </div>
      <div className={styles.specialPro} > {
          this.props.specialList.map(el => {
            return (<div className={styles.bookBox} >
              <Link to={`/products/` + el.name} className={styles.boxImg} >
                <img style={{"width":"150px"}} src={"http://localhost:7001/public/products/"+el.img} />
                <p> {el.name}</p>
              </Link>
              <p> {el.info} </p>
              <div className={styles.price} >
                {"特价 ￥：" + el.seckill}
              </div>
            </div >
            )
          })
        } </div>
      </div >
    );
  }
}
export default Special
