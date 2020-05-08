import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用
function bookInfo(data) {
    return axios.post('http://localhost:7001/products/bookInfo', data)
}
function joinCarts(data) {
    return axios.post('http://localhost:7001/products/joinCarts', data)
}


export default {
    namespace: "products",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *bookInfo(action, { put, call }) {
            try {
                console.log(action.payload)
                const res = yield call(bookInfo, action.payload)
                if (res.statusText === 'OK') {
                    yield put({ type: 'initBook', payload: res.data })
                }
            } catch (err) {
                message.info(err)
            }
        },
        *joinCarts(action, { put, call }) {
            try {
                const res = yield call(joinCarts, action.payload)
                console.log(res)
                if (res.statusText === 'OK') {
                    message.info(res.data.mes)
                }
            } catch (err) {
                message.info(err)
            }
        },
        
    },
    reducers: {
        initBook(state, action) {
            return action.payload
        }
    },

}