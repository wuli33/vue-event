// 基于axios封装网络请求的函数
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

// axios.create()创建一个带配置的自定义axios函数
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 请求拦截器 （发请求前给请求头添加一个字段（token））
myAxios.interceptors.request.use(function (config) {
  // 在请求前会触发一次
  if (store.state.token) {
    // 给请求头添加一个字段（token）不能瞎写
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 请求发起前的代码如果有异常会进入这里
  // 返回一个拒绝状态的promise对象
  return Promise.reject(error)
})

// 响应拦截器 （token过期处理）
myAxios.interceptors.response.use((res) => {
  // 响应http状态码为 2xx 或3xx 时触发成功的回调 形参中上午res是“成功的结果”
  return res
}, (error) => {
  // 响应http状态码不是 4xx 或5xx 时触发失败的回调 形参中上午error是“失败的结果”
  if (error.response.status === 401) {
    // token过期了
    // 清除vuex的数据
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    // 跳转到登录页面
    router.push('/login')
    Message.error('用户身份已过期')
  }
  return Promise.reject(error)
}
)

export default myAxios
