import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function special() {
    return axios.post('http://localhost:7001/products/special')
}
export default {
    namespace: "special",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *special(action, { put, call }){
            const res = yield call(special)
            console.log(res)
            if (res.data.code == 1) {
                yield put({ type: 'initSpecial', payload: res.data.data })
            }
        }
    },
    reducers: {
        initSpecial(state,action){
          console.log((1111))
            return action.payload
        }
    },

}
