import axios from 'axios'
import router from 'umi/router';
import { message, notification } from 'antd'
//维护页面状态的对象

//api请求  接口调用
function login(data) {
    return axios.post('http://localhost:7001/login', data)
}
function userImg(data) {
    return axios.post('http://localhost:7001/userImg', data, { responseType: 'arraybuffer' })
}
function reg(data) {
    return axios.get('http://localhost:7001/reg', { params: data })
}
function updateInfo(data) {
    return axios.post('http://localhost:7001/updateInfo', data)
}
function changePasswd(data){
    return axios.post('http://localhost:7001/changePasswd',data)
}
function backStageLogin(data) {
    return axios.post('http://localhost:7001/administrator/login', data)
}
function allUsers(data){
    return axios.post('http://localhost:7001/allusers',data)
}
function removeUser(data){
    return axios.post('http://localhost:7001/stage/remove',data)
}

export default {
    namespace: "user",//命名空间,可省略。省略后，文件名为命名空间。
    state: [],
    effects: {//异步操作
        *login(action, { put, call }) {
            try {
                const res = yield call(login, action.payload)
                if (res.data.code === 1) {
                    const res1 = yield call(userImg, JSON.parse(JSON.stringify(res.data.data)))
                    //登录成功
                    //信息缓存
                    localStorage.setItem('userImg', 'data:image/png;base64,' + btoa(new Uint8Array(res1.data).reduce((data, byte) => data + String.fromCharCode(byte), '')))
                    localStorage.setItem("info", JSON.stringify(res.data.data))
                    router.push('/')
                }
                if (res.data.code === 0) {
                    message.info("密码错误，请重新输入密码!")
                }
            } catch (error) {
                message.info("登录失败:" + error)
            }
        },
        //注册
        *reg(action, { put, call }) {
            try {
                const res = yield call(reg, action.payload)
                if (res.data.code === 1) {
                    notification.open({
                        message: '注册成功',
                        description:
                            '即将跳转到登录页面~~'
                    });
                    router.push('/login')
                }
                if (res.data.code === 0) {
                    notification.open({
                        message: '注册失败',
                        description:
                            '错误描述：账号已存在~~'
                    });
                }
            } catch (error) {
                message.info("登录失败:" + error)
            }
        },
        //修改个人信息
        *updateInfo(action, { put, call }) {
            try {
                const res = yield call(updateInfo, action.payload)
                console.log(res)
                if(res.data.code==1){
                    localStorage.setItem("info", JSON.stringify(res.data.data))
                }
                message.info(res.data.mes)
            } catch (error) {
                message.info("修改失败:" + error)
            }
        },
        *changePasswd(action, { put, call }) {
            try {
                const res = yield call(changePasswd, action.payload)
                console.log(res)
                if(res.data.code==1){
                    router.push("/login")
                }
                message.info(res.data.mes)
            } catch (error) {
                message.info("修改失败:" + error)
            }
        },
        //后台登录接口
        *backStageLogin(action, { put, call }) {
            try {
                const res = yield call(backStageLogin, action.payload)
                if (res.data.code === 1) {
                    localStorage.setItem("AdministratorInfo", JSON.stringify(res.data.data))
                    router.push('/backStage')
                }
                if (res.data.code === 0) {
                    message.info("密码错误，请重新输入密码!")
                }
            } catch (error) {
                message.info("登录失败:" + error)
            }
        },
        //查询所有用户
        *allUsers(action, { put, call }) {
            try {
                const res = yield call(allUsers,action.payload)
                console.log(res)
                if (res.data.code === 1) {  
                    yield put({ type: "init", payload: res.data.data })
                    message.info(res.data.msg)
                }
                if (res.data.code === -1) {
                    message.info(res.data.msg)
                }
            } catch (error) {
                message.info("登录失败:" + error)
            }
        },
        //删除用户
        *removeUser(action,{put,call}){
            try{
                const res = yield call(removeUser,action.payload)
                console.log(res)
                if(res.status===200){
                    message.info("删除成功!")
                }
            }catch(err){
                message.info('删除失败'+ err)
            }
        }
    },
    reducers: {
        init(state,action) {
            return action.payload
        },
        changeImg() {
            message.info("头像更改成功")
            return null
        }
    },

}