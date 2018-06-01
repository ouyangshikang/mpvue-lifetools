import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/music/index/main',
      'pages/movie/main',
      'pages/movie/more-movie/main',
      'pages/movie/detail-movie/main',
      'pages/weather/main',
      'pages/news/main',
      'pages/github/main',
      'pages/map/main',
      'pages/music/singer/main',
      'pages/music/music-ranking/main',
      'pages/music/music-recommend/main',
      'pages/music/singer-detail/main',
      'pages/music/player/main',
      'pages/music/recommend-detail/main',
      'pages/music/rank-detail/main'

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#5b33ac',
      navigationBarTitleText: '猿生活',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#000000',
      selectedColor: '#5b33ac',
      backgroundColor: '#f0f4fb',
      borderStyle: 'black',
      position: 'bottom',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/img/home.png',
        selectedIconPath: '/static/img/home2.png'
      },
      {
        pagePath: 'pages/contact/main',
        text: '联系我们',
        iconPath: '/static/img/contact.png',
        selectedIconPath: '/static/img/contact2.png'
      }]
    },
    networkTimeout: {
      request: 5000,
      connectSocket: 20000,
      uploadFile: 20000,
      downloadFile: 20000
    }
  }
}
