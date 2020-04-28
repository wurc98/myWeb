import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function allOrders(data) {
    return axios.post('http://localhost:7001/orders/allOrders')
}
function updateOrders(data) {
    return axios.post('http://localhost:7001/orders/updateOrders', data)
}
export default {
    namespace: "orders",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *allOrders(action, { put, call }) {
            try {
                console.log(action.payload)
                const res = yield call(allOrders)
                if (res.statusText === 'OK') {
                    console.log(res)
                    yield put({ type: 'initBook', payload: res.data })
                }
            } catch (err) {
                message.info(err)
            }
        },
        *updateOrders(action, { put, call }) {
            try {
                const res = yield call(updateOrders, action.payload)
                console.log(res)
                message.info(res.data.mes)
            } catch (err) {
                message.info(err)
            }
        }
    },
    reducers: {
        initBook(state, action) {
            return action.payload
        }
    },

}