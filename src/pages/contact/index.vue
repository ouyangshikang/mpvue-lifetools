<template>
  <div class="contact-us">
		<div class="position">
			<div class="position-title">公司位置</div>
			<div class="map">
				<map
					id="map"
					style="width: 100%; height: 200px;"
					:longitude="longitude"
					:latitude="latitude"
					:markers="markers"
				></map>
			</div>
		</div>
		<div class="app-desc">
			<p>猿生活小程序旨在为用户提供更方便的生活工具</p>
			<p>是mpvue小程序的踩坑实践</p>
			<p>是前端工程化的实践</p>
		</div>
		<div class="contact-btn">
			<button class="btn" hover-class="btn-hover" @click="callPhone">技术支持-小欧</button>
			<button class="btn" hover-class="btn-hover" @click="contact">在线客服-小平</button>
		</div>
  </div>
	
</template>

<script>
export default {
  data () {
    return {
      longitude: '118.0953998',
      latitude: '24.582315',
      markers: [{
        iconPath: '/static/img/marker.png',
        id: 0,
        latitude: 24.582315,
        longitude: 118.095399,
        width: 40,
        height: 40,
        label: {
          content: '集美大学五社区五号楼',
          color: '#5b33ac',
          fontSize: 12,
          textAlign: 'left'
        }
      }]
    }
  },
  methods: {
    callPhone () {
      wx.makePhoneCall({
        phoneNumber: '15659828292'
      })
    },
    contact () {
      wx.showModal({
        title: '提示',
        content: '客服小平在泡妞，请稍后',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.contact-us {
	.position {
		position: fixed;
		top: 0;
		width: 100%;
		background: #f0f0f0;
		&-title {
			padding-left: 10px;
			font-size: 14px;
			color: #000000;
			border-bottom: 1px solid #cccccc;
			line-height: 30px;
		}
	}
	.app-desc {
		position:absolute;
		top:240px;
		// height: 60px;
		width: 315px;
		padding: 10px 30px;
		color: rgba(0, 0, 0, 0.6);
		font-size: 14px;
		text-align: center;
		p {
			line-height: 25px;
		}
	}
	.contact-btn {
		position: absolute;
		top: 335px;
		width: 100%;
		.btn {
			width: 340px;
			margin-bottom: 16px;
			background: #5b33ac;
			color: #ffffff;
			font-size: 14px;
		}
		.btn-hover {
			background: #451c96;
		}
	}
}
</style>
