import request from '@/utils/request'
import store from '@/store'
//   axios发请求返回结果是Promise对象
//   return这个promiss对象到逻辑页面，在那边对Promiss对象提取结果
// 导出接口方法，为了在逻辑页面引入后调用

// 注册接口
export const registerAPI = ({ username, password, repassword }) => {
  return request({ url: '/api/reg', method: 'POST', data: { username, password, repassword } })
}

// 登录接口
export const loginAPI = ({ username, password }) => {
  return request({ url: '/api/login', method: 'POST', data: { username, password } })
}

// 获取个人信息接口 method不写默认是get
export const getUserInfoAPI = () => {
  // this.$store.state.token  这里的this不是组件对象 不能用this.$store拿到store对象
  return request({ url: '/my/userinfo', method: 'GET', headers: { Authorization: store.state.token } })
}

// 获取侧边栏数据 method不写默认是get
export const getMenusListAPI = () => {
  return request({ url: '/my/menus', headers: { Authorization: store.state.token } })
}
