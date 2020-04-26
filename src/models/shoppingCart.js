import axios from 'axios'
import {message} from 'antd'
//维护页面状态的对象
//api请求  接口调用
function getCart(data){
    return axios.post('http://localhost:7001/carts/getCart',data)
}
function updateNum(data){
    return axios.post('http://localhost:7001/carts/updateNum',data)
}
export default {
    namespace: "shoppingCart",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *getCart(action,{put,call}){
            try{
                const res = yield call(getCart,action.payload)
                console.log(res)
                yield put({type:"init",payload:res.data.goods})
            }catch(err){
                message.info(err)
            }
        },
        *updateNum(action,{put,call}){
            try{
                const res = yield call(updateNum,action.payload)
                console.log(res)
            }catch(err){
                message.info(err)
            }
        }
    },
    reducers: {
        init(state,action){
            return action.payload
        }
    },

}