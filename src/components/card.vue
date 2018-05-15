<template>
  <div class="cardList">
    <ul>
      <li
        class="card"
        v-for="tool in toolList"
        :key="tool.name"
        @click="jmpPage(tool.url)"
      >
        <i
          class="iconfont"
          :class="tool.iconClass"
        ></i>
        <span>{{ tool.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    toolList: {
      type: Array,
      default: []
    }
  },
  methods: {
    jmpPage (url) {
      wx.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/common/css/variable.scss";
.cardList {
  width: 375px;
  ul {
    margin-top: 30px;
    width: 345px;
    min-height: 250px;
    padding: 15px;
    .card {
      width: 115px;
      height: 100px;
      display: inline-block;
      // justify-content: center;
      // align-items: center;
      i {
        font-size: 46px;
        color: $bgcolor;
      }
      span {
        font-size: $normalSize;
        color: #666666;
      }
    }
  }
}
</style>
