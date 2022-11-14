// 基于axios封装网络请求的函数
import axios from 'axios'

// axios.create()创建一个带配置的自定义axios函数
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

export default myAxios
