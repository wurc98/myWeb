import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function userOrders(data) {
    return axios.post('http://localhost:7001/users/findOrders', data)
}

export default {
    namespace: "changeBookData ",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *userOrders(action, { put, call }) {
            try {
                console.log(action.payload)
                const res = yield call(userOrders, action.payload)
                if (res.statusText === 'OK') {
                    console.log(res)
                    yield put({ type: 'initBook', payload: res.data.res })
                }
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