import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function booms() {
    return axios.post('http://localhost:7001/products/booms')
}
function addBooms(data) {
    return axios.post('http://localhost:7001/products/addBooms',data)
}
function removeBooms(data) {
    return axios.post('http://localhost:7001/products/removeBooms',data)
}
export default {
    namespace: "booms",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *booms(action, { put, call }){
            const res = yield call(booms)
            if (res.data.code == 1) {
                yield put({ type: 'initBooms', payload: res.data.data })
            }
        },
        *addBooms(action, { put, call }){
            const res = yield call(addBooms,action.payload)
            console.log(res)
            if (res.data.code == 1) {
               message.info("添加成功")
            }
        },
        *removeBooms(action, { put, call }){
            const res = yield call(removeBooms,action.payload)
            console.log(res)
            if (res.data.code == 1) {
               message.info(res.data.mes)
            }
        },
    },
    reducers: {
        initBooms(state,action){
            return action.payload
        }
    },

}
