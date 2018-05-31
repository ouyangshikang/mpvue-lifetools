import Vue from 'vue'
import App from './detail-movie'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
  config: {
    navigationBarTitleText: '小猿电影'
  }
}
