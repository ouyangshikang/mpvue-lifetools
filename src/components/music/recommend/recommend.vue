<template>
	<div class="recommend">
		<div class="recommend-list">
			<h1 class="list-title">为你推荐歌单</h1>
			<ul>
				<li @click="selectItem(item)" v-for="item in discList" class="item" :key="item.dissid">
					<div class="icon">
						<img :src="item.imgurl">
					</div>
					<div class="text">
						<h2 class="name" v-html="item.creator.name"></h2>
						<p class="desc" v-html="item.dissname"></p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import api from '@/api/index'
import {ERR_OK} from '@/api/config'
export default {
  data () {
    return {
      discList: []
    }
  },
  methods: {
    getDiscList () {
      wx.showLoading({
        title: '正在加载...'
      })
      api.getDiscList().then(res => {
        if (res.data.code === ERR_OK) {
          // console.log(res.data.data.list)
          this.discList = res.data.data.list
          wx.hideLoading()
        }
      }).catch(error => {
        wx.hideLoading()
        console.log(error)
      })
    }
  },
  created () {
    this.getDiscList()
  }
}
</script>


<style lang="scss">
@import "@/common/css/variable.scss";
.recommend {
	.recommend-list {
		.list-title {
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 18px;
			color: #000;
			background: #fff;
			font-weight: bold;
			letter-spacing: 3px;
		}
		ul {
			padding-bottom: 60px;
			.item {
				display: flex;
				box-sizing: border-box;
				align-items: center;
				padding: 10px 20px 10px 20px;
				&:active {
					background: rgba(204, 204, 204, 0.6);
				}
				.icon > img {
					flex: 0 0 60px;
					width: 60px;
					height: 60px;
					padding-right: 20px;
				}
				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					flex: 1;
					line-height: 20px;
					overflow: hidden;
					font-size: $normalSize;
					text-align: left;
					.name{
							margin-bottom: 10px;
							color: #000000;
					}
					.desc{
							color: rgba(0, 0, 0, 0.5);
					}
				}
			}
		}
	}

	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>

