<template>
  <div class="weather">
    <div class="weather-time items">
        <span class="weather-date">
					周四 04月26日
        </span>
        <span class="weather-now">
					（实时: 26℃）
        </span>
    </div>
		<div class="weather-temperature items">
			<span>27 ~ 20℃-多云</span>
		</div>
		<div class="weather-detail items">
			<span>PM2.5: 61</span>
			<span>风力: 东北风4-5级</span>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

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
	}
	&-temperature {
		height: 35px;
		line-height: 35px;
		font-size: $bigSize;
	}
}
</style>
