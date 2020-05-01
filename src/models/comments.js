import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用
function getComments(data) {
    return axios.post('http://localhost:7001/products/getComment', data)
}

export default {
    namespace: "comments",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *getComments(action, { put, call }) {
            try {
                console.log(action.payload)
                const res = yield call(getComments, action.payload)
                console.log(res)
                if (res.data.code === 1) {
                    yield put({ type: 'initComments', payload: res.data.mes })
                }
            } catch (err) {
                message.info(err)
            }
        }
    },
    reducers: {
        initComments(state, action) {
            return action.payload
        }
    },

}