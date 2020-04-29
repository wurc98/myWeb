import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function rank() {
    return axios.post('http://localhost:7001/products/rank')
}
export default {
    namespace: "rank",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *rank(action, { put, call }){
            const res = yield call(rank)
            console.log(res)
            if (res.data.code == 1) {
                yield put({ type: 'initRank', payload: res.data.data })
            }
        }
    },
    reducers: {
        initRank(state,action){
            return action.payload
        }
    },

}