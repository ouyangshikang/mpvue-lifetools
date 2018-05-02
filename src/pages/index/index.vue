<template>
  <div class="container">
    <header>
      <span>厦门市</span>
    </header>
    <div class="container-box">
      <div class="weather-info">
        <weather></weather>
      </div>
      <div class="toolList">
        <card :toolList="toolList"></card>
      </div>
    </div>
  </div>
</template>

<script>
import weather from 'components/weather'
import card from 'components/card'
import { requestWeatherData } from '@/api/weather.js'

export default {
  data () {
    return {
      toolList: [{
        name: '小猿音乐',
        url: '/pages/music/main',
        iconClass: 'icon-yinle'
      }, {
        name: '小猿电影',
        url: '/pages/movie/main',
        iconClass: 'icon-dianying'
      }, {
        name: '天气预报',
        url: '/pages/weather/main',
        iconClass: 'icon-tianqi'
      }, {
        name: '知乎资讯',
        url: '/pages/news/main',
        iconClass: 'icon-zhihu'
      }, {
        name: 'github ranking',
        url: '/pages/github/main',
        iconClass: 'icon-github'
      }, {
        name: '地图服务',
        url: '/pages/map/main',
        iconClass: 'icon-ditu'
      }],
      weather: {}
    }
  },

  components: {
    weather,
    card
  },

  methods: {
    getWeatherData () {
      requestWeatherData(res => {
        console.log('res', res)
        this.weather = res
      })
    }
  },

  created () {
    this.getWeatherData()
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/css/variable.scss";
.container {
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 20px;
    background-color: $bgcolor;
    text-align: center;
    padding-bottom: 10px;
    z-index: 999;
    span {
      color: $fontColor;
      font-size: $normalSize;
    }
  }
  &-box {
    margin-top: 30px;
    // width: 100vw;
    text-align: center;
    position: relative;
    .weather-info {
      height: 130px;
      width: 100%;
      padding: 5px 0;
      background-color: $bgcolor;
    }
    .toolList {
      display: flex;
      justify-content: center;
      width: 800px;
      // min-height: 450px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      margin-top: -20px;
      background: #fefefe;
    }
  }
}
</style>
