<template>
	<div class="type">
		<ul>
      <li
        class="card"
        v-for="item in typeList"
        :key="item.name"
        @click="jmpPage(item.url)"
      >
        <i
          class="iconfont"
          :class="item.iconClass"
        ></i>
        <span>{{ item.name }}</span>
      </li>
    </ul>
	</div>
</template>

<script>
export default {
  name: 'type',
  data () {
    return {
      typeList: [{
        name: '歌手',
        url: '/pages/music/singer/main',
        iconClass: 'icon-geshou'
      }, {
        name: '排行',
        url: '/pages/music/music-ranking/main',
        iconClass: 'icon-paihang'
      }, {
        name: '音乐推荐',
        url: '/pages/music/music-recommend/main',
        iconClass: 'icon-tuijian'
      }]
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
.type {
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:-4px auto 0;
  box-shadow: 0 3px 5px 1px #efefef;
  width:360px;
  height:70px;
  z-index:9;
  background:#ffffff;
  border-radius: 3px 3px 0 0;
	ul {
    display: flex;
    .card {
      width: 115px;
      text-align: center;
      i {
        font-size: 27px;
        color: $bgcolor;
        height: 30px;
      }
      span {
        font-size: $normalSize;
        color: #000000;
      }
    }
  }
}
</style>

