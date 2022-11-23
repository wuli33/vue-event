import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      }
    ]
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

const whiteList = ['/login', '/reg']// 白名单 不用登陆也可以访问
// 全局前置路由守卫对象
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了但没有用户信息
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    // 未登录 且要访问的组件在白名单里 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 未登录 且想去白名单以外的页面 强制切换到登录页面
      next('/login')
    }
  }
})

export default router
