<template>
  <div class="container">
    <header>
      <span>{{weathers.location}}</span>
    </header>
    <div class="container-box">
      <div class="weather-info">
        <weather :weatherData="weathers"></weather>
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
import api from '@/api/index.js'

export default {
  data () {
    return {
      toolList: [{
        name: '小猿音乐',
        url: '/pages/music/index/main',
        iconClass: 'icon-yinle'
      }, {
        name: '小猿电影',
        url: '/pages/movie/main',
        iconClass: 'icon-dianying'
      }, {
        name: '小猿天气',
        url: '/pages/weather/main',
        iconClass: 'icon-tianqi'
      },
      // {
      //   name: '知乎资讯',
      //   url: '/pages/news/main',
      //   iconClass: 'icon-zhihu'
      // },
      {
        name: 'github ranking',
        url: '/pages/github/main',
        iconClass: 'icon-github'
      }
      // {
      //   name: '地图服务',
      //   url: '/pages/map/main',
      //   iconClass: 'icon-ditu'
      // }
      ],
      weathers: {}
    }
  },

  components: {
    weather,
    card
  },

  methods: {
    getWeatherData () {
      let that = this
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标
        success: function (res) {
          console.log(res)
          api.getWeatherData(res.longitude, res.latitude).then(re => {
            let weatherData = that.pareseWeahterData(re)
            that.weathers = weatherData
            console.log('weatherData', that.weathers)
          })
          api.getAirData(res.longitude, res.latitude).then(re => {
            let air = {
              pm25: re.data.HeWeather6[0].air_now_city.pm25
            }
            Object.assign(that.weathers, air)
          })
        },
        fail: function (res) {
          console.log(res.msg || res.err)
        }
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    /**
     * 解析天气预报数据
     */
    pareseWeahterData (orignData) {
      let data = orignData.data.HeWeather6[0]
      let weather = {
        basic: data.basic, // 基础信心
        now: data.now, // 实况天气
        update: data.update, // 接口更新时间
        daily_forecast: data.daily_forecast, // 天气预报
        hourly: data.hourly, // 逐小时预报
        lifestyle: data.lifestyle, // 生活指数
        location: data.basic.location, // 定位城市
        tmp: data.now.tmp, // 实时温度
        tmp_max: data.daily_forecast[0].tmp_max, // 最高温度
        tmp_min: data.daily_forecast[0].tmp_min, // 最低温度
        wind_dir: data.daily_forecast[0].wind_dir, // 风向
        wind_sc: data.daily_forecast[0].wind_sc, // 风力
        cond_txt: data.now.cond_txt // 实况天气
      }
      return weather
    }
  },

  created () {
    this.getWeatherData()
  },
  onPullDownRefresh () {
    console.log('下拉刷新了')
    wx.showNavigationBarLoading()
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
