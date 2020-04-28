import axios from 'axios'
import { message } from 'antd'
//维护页面状态的对象

//api请求  接口调用

function allBooks(data) {
    return axios.post('http://localhost:7001/stage/allBooks', data)
}
function addBooks(data) {
    return axios.post('http://localhost:7001/stage/addBook', data)
}
function removeBooks(data) {
    return axios.post('http://localhost:7001/stage/removeBook', data)
}
function updateBooks(data) {
    return axios.post('http://localhost:7001/stage/updateBooks', data)
}
function removeOrder(data) {
    return axios.post('http://localhost:7001/stage/removeOrder', data)
}


export default {
    namespace: "stage",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *allBooks(action, { put, call }) {
            try {
                const res = yield call(allBooks, action.payload)
                if (res.statusText === 'OK') {
                    console.log(res)
                    yield put({ type: 'initBook', payload: res.data })
                }
            } catch (err) {
                message.info(err)
            }
        },
        *addBooks(action, { put, call }) {
            try {
                console.log(`1111`)
                console.log(action.payload)
                const res = yield call(addBooks, action.payload)
                if (res.statusText === 'OK') {
                    console.log(res)
                    message.info('添加成功')
                }
            } catch (error) {
                message.info(error)
            }
        },
        *removeBooks(action,{put,call}){
            try {
                console.log(`1111`)
                console.log(action.payload)
                const res = yield call(removeBooks, action.payload)
                if (res.statusText === 'OK') {
                    console.log(res)
                    message.info('删除成功')
                }
            } catch (error) {
                message.info(error)
            }
        },
        *updateBooks(action,{put,call}){
            try {
                const res = yield call(updateBooks, action.payload)
                message.info(res.data.mes)
            } catch (error) {
                message.info(error)
            }
        },
        *removeOrder(action,{put,call}){
            try {
                const res = yield call(removeOrder,action.payload)
                if (res.statusText === 'OK') {
                    message.info('删除成功')
                }
            } catch (error) {
                message.info(error)
            }
        }
    },
    reducers: {
        initBook(state, action) {
            return action.payload
        }
    },

}