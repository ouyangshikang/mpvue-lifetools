<template>
  <div class="weather">
      <div class="weather-location">
        集美区
      </div>
      <div class="weather-keyword">
        <div class="weather-keyword__status">阴</div>
        <div class="weather-keyword__temperature">20°</div>
        <div class="weather-keyword__desc">
          <span>
            <i></i>
            东北风2级
          </span>
          <span>
            <i></i>
            46 优
          </span>
        </div>
      </div>

      <div class="weather-hourly">
        <div
          class="weather-hourly-detail"
          v-for="hour in hourly"
          :key="hour"
        >
          <span class="weather-hourly-detail__time">1:00</span>
          <i></i>
          <span class="weather-hourly-detail__txt">多云</span>
          <span class="weather-hourly-detail__temp">21°</span>
        </div>
      </div>

      <div class="weather-daily">
        <div
          class="weather-daily-detail"
          v-for="day in daily"
          :key="day"
        >
          <span class="weather-daily-detail__time">5/4</span>
          <span class="weather-daily-detail__txt">
            <i></i>
            多云
          </span>
          <span class="weather-daily-detail__tmp">26°~19°</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hourly: [
        1, 2, 3, 4, 5, 6, 7, 8
      ],
      daily: [
        1, 2, 3, 4, 5, 6, 7
      ]
    }
  }
}
</script>

<style lang="scss">
@import "@/common/css/variable.scss";
.weather {
  width: 100%;
  min-height: 100vh;
  background: $weatherBg;
  color: $fontColor;
  text-align:center;
  padding-bottom: 100px;
  &-location {
    font-size: $normalSize;
    text-align: center;
  }
  &-keyword {
    width: 100%;
    height: 180px;
    padding: 40px 0;
    &__status {
      font-size: $bigerSize;
    }
    &__temperature {
      font-size: 100px;
      font-weight: bold;
      margin-left:35px;
      letter-spacing:1px;
      height:130px;
    }
    &__desc {
      font-size: $normalSize;
      span {
        display: inline-block;
        margin:0px 10px;
      }
    }
  }

  &-hourly {
    display: flex;
    width: 100%;
    height: 90px;
    border-top: 1px solid rgba(131, 131, 131, 0.4);
    border-bottom: 1px solid rgba(131, 131, 131, 0.4);
    overflow-x: scroll;
    font-size: $smallSize;
    &-detail {
      padding:15px 20px;
    }
  }

  &-daily {
    height: 180px;
    border-bottom: 1px solid rgba(131, 131, 131, 0.4);
    padding: 15px 20px;
    &-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing:1px;
      font-size: $normalSize;
      line-height: 26px;
      span {

      }
    }
  }
}
</style>
