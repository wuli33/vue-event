import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // 保存token字符串
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken (state, vaild) {
      state.token = vaild
    }
  },
  actions: {
  },
  modules: {
  }
})
