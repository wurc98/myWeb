
import styles from './commodity.css';
import Nav from './nav/Nav'
import { Carousel } from 'antd';
import React, { useState } from "react"
export default function () {
  const [content, setContent] = useState()
  const [disable, setDisable] = useState(true)
  let imgList = [
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg',
    'http://img62.ddimg.cn/2020/2/12/2020021218103443765.jpg'
  ]
  //最新动态
  let news = [
    "万种童书，每满100减40!",
    "人文社科，每满100减50!",
    "多彩艺术 名人故事 每满100减50!",
  ]
  //图书分类
  let leftTitle = [
    {
      title: "特色书单",
      booklist: [
        {
          title: "童书",
          content: [
            "凯迪克奖获奖作品",
            "纽伯瑞奖获奖作品",
            "高铁的秘密",
            "读专/“鼠/”于你的好绘本",
            "好想去这样那样的国家",
            "童心陶醉的幻想世界",
            "新宝驾到",
            "模范爸爸是什么样"
          ]
        },
        {
          title: "童书",
          content: [
            "凯迪克奖获奖作品",
            "纽伯瑞奖获奖作品",
            "高铁的秘密",
            "读专/“鼠/”于你的好绘本",
            "好想去这样那样的国家",
            "童心陶醉的幻想世界",
            "新宝驾到",
            "模范爸爸是什么样"
          ]
        },
        {
          title: "童书",
          content: [
            "凯迪克奖获奖作品",
            "纽伯瑞奖获奖作品",
            "高铁的秘密",
            "读专/“鼠/”于你的好绘本",
            "好想去这样那样的国家",
            "童心陶醉的幻想世界",
            "新宝驾到",
            "模范爸爸是什么样"
          ]
        },
        {
          title: "童书",
          content: [
            "凯迪克奖获奖作品",
            "纽伯瑞奖获奖作品",
            "高铁的秘密",
            "读专/“鼠/”于你的好绘本",
            "好想去这样那样的国家",
            "童心陶醉的幻想世界",
            "新宝驾到",
            "模范爸爸是什么样"
          ]
        },
      ]
    },
    {
      title: ["电子书", "网络文学"]
    },
    {
      title: "教育",
      content: ["教材", "外语", "考试", "中小学教辅", "工具书"]
    },
    { title: "小说" },
    {
      title: "文艺",
      content: ["文学", "传记", "艺术", "摄影"]
    },
    ["青春文学", "/动漫", "·幽默"],
    {
      title: "童书",
      content: ["科普百科", "绘本", "文学", "英语"],
    },
    {
      title: "人文社科",
      content: ["历史", "古籍", "哲学/宗教", "文化", "政治/军事", "法律", "社会科学", "心理学"]
    }
  ]
  //鼠标移至分类
  let over = (index) => {
    console.log(index)
  }
  let leave = function () {
    setDisable(!disable)
  }
  //书单
  return (
    <div className={styles.normal}>
      <Nav />
      <div className={styles.body}>
        <div className={styles.advers}></div>
        <div className={styles.books_one} onMouseLeave={leave}>
          <div className={styles.one_left} >
            <div className={styles.title} id="commodity">图书分类</div>
            <div className={styles.booksList}>
              {leftTitle.map((el, index) => {
                if (el.title instanceof Array) {
                  return (<span onMouseEnter={over(index)}>
                    {el.title.map(e => {
                      return (<a>{e} </a>)
                    })}
                  </span>)
                } else if (el.content == undefined) {
                  console.log(el)
                  return (<span onMouseEnter={over(index)}><a>{el.title}</a></span>)
                } else {
                  return (
                    <span onMouseEnter={over(index)}>
                      <p><a>{el.title}</a></p>
                      <div style={{ "fontSize": "13px" }}>
                        {el.content.map((e, index) => {
                          if (index == el.content.length - 1) {
                            return (
                              <a style={{ "color": "gray" }}>{e}</a>
                            )
                          }
                          return (
                            <span style={{ "marginRight": "5px" }}>
                              <a style={{ "paddingRight": "5px", "color": "gray" }}>{e}</a>
                              |
                            </span>
                          )
                        })}
                      </div>
                    </span>
                  )
                }
              })}
            </div>
            
          </div>

          <div className={styles.one_right}>
            <div className={styles.news}>
              <div style={{ "width": "100%", "height": "36px", }}>
                <h2>最新动态</h2>
              </div>
              <div style={{ "width": "100%", "height": "60px", "fontSize": "13px" }}>
                <ul>
                  {news.map(el => {
                    return (
                      <li>
                        <a style={{ "color": "red" }}>{el}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.presell}>
              <div style={{ "paddingLeft": "10px" }}>
                <h2>新书预售</h2>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className={styles.one_mid}>
            <div className={styles.trotting_box}>
              <Carousel autoplay>
                {
                  imgList.map((item, index) => {
                    return (<img key={item + index} src={item} />)
                  })
                }
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
