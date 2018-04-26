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

      </div>
    </div>
  </div>
</template>

<script>
import weather from 'components/weather'
export default {
  data () {
    return {

    }
  },

  components: {
    weather
  },

  methods: {

  },

  created () {
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
      width: 1000px;
      min-height: 450px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      margin-top: -20px;
      background: #fefefe;
    }
  }
}
</style>
