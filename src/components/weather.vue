<template>
  <div class="weather">
    <div class="weather-time items">
        <span class="weather-date">
					{{nowTime}}
        </span>
        <span class="weather-now">
					（实时: {{weatherData.tmp}}℃）
        </span>
    </div>
		<div class="weather-temperature items">
			<span>{{weatherData.tmp_max}} ~ {{weatherData.tmp_min}}℃-{{weatherData.cond_txt}}</span>
		</div>
		<div class="weather-detail items">
			<span>
				PM2.5: {{weatherData.pm25}}
			</span>
			<span>
				风力: {{weatherData.wind_dir}} {{weatherData.wind_sc}}级
			</span>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    nowTime () {
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const date = new Date()
      let d = date.getDay()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let weekDay = week[d]
      month < 10 ? month = '0' + month : month
      day < 10 ? day = '0' + day : day
      return `${weekDay}  ${month}月${day}日`
    }
    // weather () {
    //   let wdata = this.weatherData
    //   console.log('wdata', wdata)
    //   let weath = {
    //     tmp: wdata.now.tmp, // 实时温度
    //     tmp_max: wdata.daily_forecast[0].tmp_max, // 最高温度
    //     tmp_min: wdata.daily_forecast[0].tmp_min, // 最低温度
    //     cond_txt: wdata.now.cond_txt // 实况天气
    //   }
    //   return weath
    // }
  },
  props: {
    weatherData: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss">
@import "@/common/css/variable.scss";
.weather {
	color: $fontColor;
	font-size: $smallSize;
	.items {
		height: 35px;
		line-height: 35px;
    span {
      padding: 0 3px;
    }
	}
	&-temperature {
		height: 35px;
		line-height: 35px;
		font-size: $bigSize;
	}
}
</style>
