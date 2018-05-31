
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
// import actions from './actions'
import * as actions from './actions'
import getters from './getters'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  // 做模块化处理,每个功能一个store.js文件,然后统一在这边引入
  // modules: {
  //   musicStore
  // }
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
