import request from '@/utils/request'

//   axios发请求返回结果是Promise对象
//   return这个promiss对象到逻辑页面，在那边对Promiss对象提取结果
// 导出接口方法，为了在逻辑页面引入后调用
export const registerAPI = () => {
  return request({ url: '/api/reg', method: 'POST', data: { username: 'zhangsan', password: '111111', repassword: '111111' } })
}