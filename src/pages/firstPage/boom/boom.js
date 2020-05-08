
import styles from './boom.css';
import Link from 'umi/link'
import { Tabs } from 'antd'
import { connect } from "dva"
import React, { Component } from 'react';
const { TabPane } = Tabs;

@connect(
  state => ({
    rankList: state.rank,
    boomsList: state.booms
  })
)
class Boom extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.dispatch({ type: "rank/rank" })
    this.props.dispatch({ type: "booms/booms" })
  }
  render() {
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
    return (
      <div className={styles.normal} id="boom">
        <div className={styles.left}>
          <div className={styles.title}>
            <h3 >畅销商品</h3>
          </div>
          <div className={styles.boomPro}>
            {this.props.boomsList.map(el => {
              return (
                <div className={styles.bookBox}>
                  <Link to={`/products/` + el.name} className={styles.boxImg}>
                    <img style={{ "width": "150px" }} src={"http://localhost:7001/public/products/" + el.img} />
                    <p> {el.name}</p>
                  </Link>
                  <p>{el.info}</p>
                  <div className={styles.price}>{"价格￥：" + el.price}</div>
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
                    this.props.rankList.map((el, index) => {
                      return (
                        <li className={styles.rankingLine}>
                          <Link to={'./products/' + el.name}>
                            <span className={styles.num} style={index < 3 ? { "color": "red" } : {}}>{index + 1}</span>
                            <span className={styles.bookname}>{el.name}</span>
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

            <div style={{ "width": "100%", 'height': "31px" }}>
              <p style={{ "textAlign": "right", "padding": "0 10px" }}>《《《 更多榜单</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Boom;