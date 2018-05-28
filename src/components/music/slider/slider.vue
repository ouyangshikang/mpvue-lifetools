<template>
	<div class="slider">
		<swiper
			indicator-dots="true"
			autoplay="true"
			interval="5000"
			duration="1000"
			indicator-color="rgba(255, 255, 255, 0.5)"
			indicator-active-color="#5b33ac"
		>
			<swiper-item>
				<img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282989.jpg" class="slider-image">
			</swiper-item>
			<swiper-item>
				<img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282312.jpeg" class="slider-image">
			</swiper-item>
			<swiper-item>
				<img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282900.jpg" class="slider-image">
			</swiper-item>
  	</swiper>
	</div>
</template>

<script>
export default {
  name: 'slider',
  data () {
    return {
      imgUrls: [{
        url: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282989.jpg'
      }, {
        url: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282312.jpeg'
      }, {
        url: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/282900.jpg'
      }]
    }
  },
  methods: {

  }
}
</script>


<style lang="scss">
.slider {
	.slider-image {
		width: 100%;
		height: 100%;
	}
}
</style>

