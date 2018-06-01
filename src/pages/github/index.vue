<template>
  <div class="github">
    <div class="swiper-tab">
			<div
				class="swiper-tab-list"
				:class="[currentTab == index ? 'on' : '']"
				:data-current="index"
				@click="swichNav"
        v-for="(lang, index) in langs"
        :key="index"
        :data-lang="lang"
			>
				<span :data-current="index">{{lang}}</span>
			</div>
		</div>

		<swiper
			:current="currentTab"
			class="swiper-box"
			duration="400"
			@change="bindChange"
		>
			<swiper-item
        class="swiper-item"
        v-for="(lang, kindex) in langs"
        :key="kindex"
      >  
				<div
          v-for="(item, nindex) of infos"
          class="item"
          :key="nindex"
          v-if="item.title"
        >
          <div class="name">
            <a :href="item.link" target="_blank">{{ item ? item.title : '' }}</a>
          </div>
          <div class="desc">
            {{ item ? item.desc : '' }}
          </div>
          <div class="infos">
            <div class="lang">
              <span :class="lang"></span>{{lang}}
            </div>
            <div class="star">
              <i class="iconfont icon-star"></i>
              {{ item ? item.star : '' }}
            </div>
          </div>
          <div class="update">
            {{ item ? item.updateDate : ''}}
          </div>
				</div>
			</swiper-item>
		</swiper>
  </div>
</template>

<script>
import api from '@/api/index'
export default {
  data () {
    return {
      currentTab: 1,
      langs: ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Ruby', 'Python', 'TypeScript', 'CoffeeScript'],
      infos: [],
      lang: ''
    }
  },
  methods: {
    bindChange (e) {
      // console.log('滑块', e)
      this.currentTab = e.mp.detail.current
      // let lang = e.currentTarget.dataset.lang
      // console.log(lang)
      // this.getGithubRanking(lang)
    },
    swichNav (e) {
      // console.log('点击tab', e)
      this.currentTab = e.target.dataset.current
      this.lang = e.currentTarget.dataset.lang
      console.log(this.lang)
      this.getGithubRanking(this.lang)
    },
    getGithubRanking (lang) {
      wx.showLoading({
        title: '正在加载...'
      })
      let that = this
      api.getGithubRanking(lang).then(res => {
        console.log(res.data)
        const result = res.data
        Object.keys(result).forEach(item => {
          result[item].forEach((val, index) => {
            if (!that.infos[index]) {
              that.infos[index] = {}
            }
            // this.infos[index][item.replace(/s$/, '')] = val
            console.log(result[item])
            that.$nextTick(() => {
              // that.$set(that.infos, index, val)
              that.infos[index][item.replace(/s$/, '')] = val
            })
          })
        })
        wx.hideLoading()
      })
      console.log('infos', this.infos)
    }
  },
  mounted () {
    this.getGithubRanking('HTML')
  }
}
</script>

<style lang="scss">
.github {
  width: 100vw;
	height: 100vh;
	.swiper-tab{
    position: fixed;
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
    position: absolute;
    top: 130px;
		width: 100%;
		height: calc(100vh - 130px);
		.swiper-item {
			overflow-x: hidden;
			overflow-y: scroll;
			text-align: center;
      color: #000000;
      .item {
        width: 100%;
        padding: 5px 10px;
        text-align: left;
        .name {
          font-size: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 700;
          a {
            position: relative;
            text-decoration: none;
            color: #3f51b5;
            cursor: pointer;
          }
        }
        .desc {
          padding-top: 7px;
          font-size: 14px;
        }
        .infos {
          padding: 5px 0;
          display: flex;
          .lang {
            // padding-left: 10px;
            letter-spacing: 1px;
            font-size: 12px;
            flex: 3;
            span {
              display: inline-block;
              width: 12px;
              height: 12px;
              border-radius: 6px;
              background-color: #f1e05a;
              margin-right: 3px;
            }
            .C {
              background-color: #178600;
            }
            .TypeScript {
              background-color: #2b7489;
            }
            .Python {
              background-color: #3572A5;
            }
            .CoffeScript {
              background-color: #244776;
            }
            .Ruby {
              background-color: #701516;
            }
            .Java {
              background-color: #b07219;
            }
            .PHP {
              background-color: #4F5D95;
            }
            .CSS {
              background-color: #563d7c;
            }
            .HTML {
              background-color: #e34c26;
            }
          }
          .star {
            flex: 1;
            height: 16px;
            font-size: 12px;
            .icon-star {
              vertical-align: -2px;
              margin-right: 3px;
            }
          }
        }
        .update {
          color: gray;
          font-size: 12px;
        }
      }
      .item + .item {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }
		}
	}
}
</style>
