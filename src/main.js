import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/music/main',
      'pages/movie/main',
      'pages/weather/main',
      'pages/news/main',
      'pages/github/main',
      'pages/map/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2b569a',
      navigationBarTitleText: '猿生活',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#000000',
      selectedColor: '#405f80',
      backgroundColor: '##f0f4fb',
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
    }
  }
}
