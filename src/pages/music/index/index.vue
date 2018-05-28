<template>
  <div class="music-container">
		<div class="swiper-tab">
			<div
				class="swiper-tab-list"
				:class="[currentTab == 0 ? 'on' : '']"
				data-current="0"
				@click="swichNav"
			>
				<span data-current="0">我的</span>
			</div>
			<div
				class="swiper-tab-list"
				:class="[currentTab == 1 ? 'on' : '']"
				data-current="1"
				@click="swichNav"
			>
				<span data-current="1">音乐馆</span>
			</div>
			<div
				class="swiper-tab-list"
				:class="[currentTab == 2 ? 'on' : '']"
				data-current="2"
				@click="swichNav"
			>
				<span data-current="2">发现</span>
			</div>
		</div>

		<swiper
			:current="currentTab"
			class="swiper-box"
			duration="400"
			@change="bindChange"
		>  
			<swiper-item class="swiper-item">  
				<div>我的</div>  
			</swiper-item>  
			<swiper-item class="swiper-item">  
				<!-- 轮播图 -->
				<slider></slider>
				<!-- 分类导航栏 -->
				<type></type>
				<!-- 推荐歌单列表 -->
				<recommend></recommend>
			</swiper-item>  
			<swiper-item class="swiper-item">  
				<div>发现</div>  
			</swiper-item>  
		</swiper>  
  </div>
</template>

<script>
import slider from 'components/music/slider/slider'
import type from 'components/music/slider/type'
import recommend from 'components/music/recommend/recommend'
export default {
  data () {
    return {
      currentTab: 1
    }
  },
  methods: {
    bindChange (e) {
      // console.log('滑块', e)
      this.currentTab = e.mp.detail.current
    },
    swichNav (e) {
      // console.log('点击tab', e)
      this.currentTab = e.target.dataset.current
    }
  },
  components: {
    slider,
    type,
    recommend
  }
}
</script>

<style lang="scss">
.music-container {
	width: 100vw;
	height: 100vh;
	.swiper-tab{  
		width: 100%;
		background: #5b33ac;
		padding-bottom: 5px;
    text-align: center;  
		line-height: 40px;
		&-list {
			font-size: 14px;  
			display: inline-block;  
			width: 33.33%;  
			color: #e9e9e9;
			&.on {
				color: #ffffff;  
				font-size: 16px;
				font-weight: bold;
				& > span {
					border-bottom: 5rpx solid #ffffff;
					padding-bottom: 2px;
				}
			}
		}
	}  
	.swiper-box {
		display: block;
		width: 100%;
		height: calc(100vh - 47px);
		.swiper-item {
			overflow-x: hidden;
			overflow-y: scroll;
			text-align: center;
			color: #000000;
		}
	}
}
</style>
