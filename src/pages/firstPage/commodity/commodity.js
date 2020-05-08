
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
  //新书推荐
  let newBooks=[
    {
      name:"当你学会独处",
      author:"周国平",
      price:"38.8",
      img:"http://img3m8.ddimg.cn/70/15/28522168-1_l_3.jpg"
    },
    {
      name:"陪孩子终身成长",
      author:"樊登",
      price:"42.4",
      img:"http://img3m0.ddimg.cn/50/21/28529870-1_l_5.jpg"
    },
    {
      name:"想点大事·法律是中思维方式",
      author:"刘涵",
      price:"54.51",
      img:"http://img3m9.ddimg.cn/23/3/28536179-1_l_6.jpg"
    },
    {
      name:"三十岁·一切刚刚开始",
      author:"李尚龙",
      price:"34.36",
      img:"http://img3m9.ddimg.cn/75/2/28531479-1_l_5.jpg"
    },
    {
      name:"华胥引",
      author:"唐七",
      price:"59.34",
      img:"http://img3m6.ddimg.cn/60/30/28533246-1_l_9.jpg"
    },
    {
      name:"蒲公英数学",
      author:"[美]托马斯·欧布里恩",
      price:"592.70",
      img:"http://img3m1.ddimg.cn/45/4/28526301-1_l_6.jpg"
    },
    {
      name:"银火箭少年科幻系列",
      author:"（英）阿瑟·克拉",
      price:"202.20",
      img:"http://img3m6.ddimg.cn/97/1/28531996-1_l_8.jpg"
    }
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
    },
    {
      title: "生活",
      content: ["两性", "孕期", "育儿", "保健", "运动", "美妆", "手工", "美食","旅游","休闲","家居"]
    }
  ]
  //鼠标移至分类
  let over = (index) => {
    // console.log(index)
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
              <div className={styles.recommened}>
                <h2>新书推荐</h2>
                <ul className={styles.newBooksRecommened}>
                  {newBooks.map((el,index)=>{
                    if(index==newBooks.length-1){
                      return (<li style={{"marginRight":"0px"}}>
                        <img style={{"width":"100px"}} src={el.img} />
                        <p className={styles.name}>{el.name}</p>
                        <p className={styles.author}>{el.author}</p>
                        <p className={styles.price}>￥{el.price}</p>
                        </li>)
                    }
                    return (<li>
                    <img style={{"width":"100px"}} src={el.img} />
                    <p className={styles.name}>{el.name}</p>
                    <p className={styles.author}>{el.author}</p>
                    <p className={styles.price}>￥{el.price}</p>
                    </li>)
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
