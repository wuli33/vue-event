import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userInfo: {} // 保存用户信息（id，username，nickname，email，email，user_pic）
  },
  getters: {
    username: state => state.userInfo.username,
    nickname: state => state.userInfo.nickname,
    email: state => state.userInfo.email,
    user_pic: state => state.userInfo.user_pic

  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      if (res.data.code === 0) {
        store.commit('updateUserInfo', res.data.data)
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedstate()// 注入插件
  ]
})
