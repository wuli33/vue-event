import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout')
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
    // webpack提供的import函数来路由懒加载导入组件
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫对象
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) { store.dispatch('getUserInfoActions') }
  next()
})

export default router
