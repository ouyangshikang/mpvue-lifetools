<template>
	<div class="player"  v-if="playList.length > 0">
		<div class="normal-player" v-if="fullScreen">
			<div class="background">
				<img :src="currentSong.image">
			</div>
			<!-- 顶部区域 -->
			<div class="top">
				<h1 class="title">{{currentSong.name}}</h1>
				<h2 class="subtitle">{{currentSong.singer}}</h2>
			</div>
			<!-- 中间滚动区域 -->
			<swiper
				indicator-dots="true"
				indicator-color="rgba(255, 255, 255, 0.5)"
				indicator-active-color="#ffffff"
				class="middle"
			> 
			  <!-- 唱片区域 -->
				<swiper-item class="middle-l">
					<div class="cd-wrapper">
						<div class="cd" :class="cdRotate">
							<img class="image" :src="currentSong.image">
						</div>
					</div>
				</swiper-item>
				<!-- 歌词区域 -->
				<swiper-item class="middle-r">
					<scroll-view
						scroll-y="true"
						:scroll-top="scrollTop"
						class="lyric-wrapper">
						<div>
							<p
								class="text"
								:class="{'current': currentLineNum === index}"
								v-for="(line,index) in currentLyric.lines"
								:key="index"
							>{{line.txt}}</p>
						</div>
					</scroll-view>
				</swiper-item>
  		</swiper>
			
			<!-- 顶部操作区域 -->
			<div class="bottom">
				<!-- <div class="dot-wrapper">
					<span class="dot" :class="{'active':currentShow==='cd'}"></span>
					<span class="dot" :class="{'active':currentShow==='lyric'}"></span>
				</div> -->
				<!-- 歌曲进度条 -->
				<div class="progress-wrapper">
					<span class="time time-l">{{curTime}}</span>
					<div class="progress-bar-wrapper">
						<slider
							:max="currentSong.duration"
							:value="currentTime"
							color="#bebebe"
							block-size="18"
							@change="touchdot"
							@changing="touchdot"
						></slider>
					</div>
					<span class="time time-r">{{duration}}</span>
				</div>
				<!-- 歌曲进度条 -->
				<!-- 歌曲操作 -->
				<div class="operators">
					<div class="icon i-left">
						<i
							class="iconfont"
							:class="iconMode"
							@click="changeMode"
						></i>
					</div>
					<div class="icon i-left">
						<i
							class="iconfont icon-shangyiqu"
							@click="prev"
						></i>
					</div>
					<div class="icon i-center">
						<i
							class="iconfont"
							:class="playIcon"
							@click.stop="togglePlaying"
						></i>
					</div>
					<div class="icon i-right">
						<i
							class="iconfont icon-xiayiqu"
							@click="next"
						></i>
					</div>
					<div class="icon i-right">
						<i class="iconfont icon-buxihuan"></i>
					</div>
				</div>
				<!-- 歌曲操作 -->
			</div>
		</div>

		<div class="mini-player" v-if="!fullScreen" @click="openFullScreen">
			<div class="icon">
				<img :src="currentSong.image">
			</div>
			<div class="text">
				<h2 class="name">{{currentSong.name}}</h2>
				<p class="desc">{{currentSong.singer}}</p>
			</div>
			<div class="control">
				<i
					@click.stop="togglePlaying"
					class="iconfont mini-icon"
					:class="playIcon"
				></i>
			</div>
			<div class="control">
				<i class="iconfont icon-liebiao"></i>
			</div>
		</div>
		<audio :src="currentSong.url" ></audio>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {shuffle} from '../../../utils/util.js'
import Lyric from 'lyric-parser'
const innerAudioContext = wx.createInnerAudioContext()
// const backgroundAudioManager = wx.getBackgroundAudioManager()

export default {
  data () {
    return {
      currentTime: 0,
      currentLyric: {},
      currentLineNum: 0, // 当前歌词所在的行
      scrollTop: 0
    }
  },
  methods: {
    openFullScreen () {
      wx.navigateTo({
        url: `/pages/music/player/main`
      })
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    createAudio () {
      innerAudioContext.src = this.currentSong.url
      innerAudioContext.play()
      console.log(this.currentSong.url)
      this.getLyrics()
    },
    getLyrics () {
      var that = this
      this.currentSong.getLyric().then(res => {
// console.log('歌词', res)
        // const lys = new Lyric(res)
        that.currentLyric = new Lyric(res, that.handleLyric)
        if (that.playing) {
          that.currentLyric.play()
        }
        console.log('歌词在这', this.currentLyric)
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      // this.scrollTop = this.scrollTop + 50
      if (lineNum > 4) {
        this.scrollTop = 32 * (lineNum - 4)
      } else {
        this.scrollTop = 0
      }
    },
    togglePlaying () { // 播放切换
      console.log(this.playing)
      this.playing ? innerAudioContext.pause() : innerAudioContext.play()
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    next () { // 切换下一首歌
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    prev () { // 切换上一首歌
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    loop () {
// innerAudioContext.loop = true
      this.currentTime = 0
      innerAudioContext.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    formatTime (interval) { // 格式化时间
      interval = interval | 0 // 向上取整
      const minute = interval / 60 | 0
      const second = this.timePad(interval % 60)
      return `${minute}:${second}`
    },
    timePad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    touchdot (e) {
      console.log('拖到:', e.mp.detail.value)
      let position = e.mp.detail.value
      innerAudioContext.seek(position)
      if (this.currentLyric.lines) {
        this.currentLyric.seek(position * 1000)
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let listArr = null
      if (mode === 2) {
        listArr = shuffle(this.sequenceList)
      } else {
        listArr = this.sequenceList
      }
      this.resetCurrentIndex(listArr)
      this.setPlayList(listArr)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    }
  },

  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    playIcon () { // 播放按钮图标切换
      return this.playing ? 'icon-zanting' : 'icon-bofang'
    },
    iconMode () { // 播放模式图标切换
      return this.mode === 0 ? 'icon-shunxu' : this.mode === 1 ? 'icon-danqu' : 'icon-suiji'
    },
    cdRotate () { // cd旋转
      return this.playing ? 'play' : 'pause'
    },
    curTime () {
      return this.formatTime(this.currentTime)
    },
    duration () {
      return this.formatTime(this.currentSong.duration)
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric.lines) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLineNum = 0
      }
      this.createAudio()
    },
    currentTime (newTime, oldTime) {
      if (newTime === this.currentSong.duration) {
        if (this.mode === 1) {
          this.loop()
        } else {
          this.next()
        }
      }
    }
  },
  onLoad () {
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onTimeUpdate(() => {
      this.currentTime = Math.floor(innerAudioContext.currentTime)
      console.log('当前时间', this.currentTime)
    })
    // innerAudioContext.onEnded(() => {
    //   console.log('当前歌曲播放结束')
    //   if (this.mode === 1) {
    //     this.loop()
    //   } else {
    //     this.next()
    //   }
    // })
  },
  mounted () {
    this.getLyrics()
  }
  // onUnload () {
  //   this.setFullScreen(false)
  //   // this.innerAudioContext.destroy()
  // }
}
</script>


<style lang="scss">
@import "@/common/css/mixin.scss";
.player {
	.normal-player {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 150;
		background: #222222;
		.background {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			opacity: 0.6;
			filter: blur(20px);
			img {
				width: 100%;
				height: 100%;
			}
		}
		.top {
			position: relative;
			margin-bottom: 25px;
			.title {
				width: 70%;
				margin: 0 auto;
				line-height: 40px;
				text-align: center;
				@include no-wrap();
				font-size: 18px;
				color: #ffffff;
			}
			.subtitle {
				line-height: 20px;
				text-align: center;
				font-size: 14px;
				color: #ffffff;
			}
		}
		.middle {
			position: fixed;
			width: 100%;
			height: auto;
			top: 80px;
			bottom: 170px;
			&-l {
				display: inline-block;
				vertical-align: top;
				position: relative;
				width: 100%;
				// height: 300px;
				padding-top: 80%;
				// transform: translateZ(0px);
				.cd-wrapper {
					position: absolute;
					left: 10%;
					top: 0;
					width: 300px;
					height: 300px;
					.cd {
						width: 100%;
						height: 100%;
						box-sizing: border-box;
						border: 10px solid rgba(255, 255, 255, 0.1);
						border-radius: 50%;
						transform: rotate(0deg);
						overflow: hidden;
						&.play {
							animation: rotate 20s linear infinite;
						}   
            &.pause {
							animation: rotate 20s linear infinite;
							animation-play-state: paused;
						}
						.image {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							box-sizing: border-box;
							transform: rotate(0deg);
							border-radius: 50%;
						}
					}
				}
			}
			&-r {
				display: inline-block;
				vertical-align: top;
				width: 100%;
				height: 100%;
				overflow: scroll;
				.lyric-wrapper {
					width: 80%;
					height: 350px;
					margin: 0 auto;
					overflow: scroll;
					text-align: center;
					.text {
						line-height: 32px;
						color: rgba(255, 255, 255, 0.5);
						font-size: 14px;
						&.current {
							color: #ffffff;
						}
					}
				}
			}
		}
		.bottom {
			position: absolute;
			bottom: 50px;
			width: 100%;
			.progress-wrapper {
				display: flex;
				align-items: center;
				width: 80%;
				margin: 0px auto;
				padding: 10px 0;
				.time {
					color: #ffffff;
					font-size: 12px;
					flex: 0 0 30px;
					line-height: 30px;
					width: 30px;
					&.time-l{
						text-align: left
					}
					&.time-r {
						text-align: right
					}
				}
				.progress-bar-wrapper {
					flex: 1;
				}
			}
			.operators {
				display: flex;
				align-items: center;
				.icon {
					flex: 1;
					color: rgba(255, 255, 255, 0.5);
					i {
						font-size: 36px;
					}
					.icon-danqu, .icon-shunxu {
						font-size: 34px;
					}
				}
				.i-left {
					text-align: right;
				}
				.i-center {
					padding: 0 20px;
					text-align: center;
					i {
						font-size: 60px;
					}
				}
				.i-right {
					text-align: left;
				}
			}
		}
	}

	.mini-player {
		display: flex;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 180;
		width: 100%;
		height: 60px;
		background: #ffffff;
		box-shadow: 0 0 3px #858585;
		.icon {
			flex: 0 0 40px;
			width: 40px;
			padding: 0 10px 0 20px;
			img {
				border-radius: 50%;
				width: 40px;
				height: 40px;
			}
		}
		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			line-height: 20px;
			overflow: hidden;
			.name {
				margin-bottom: 2px;
				@include no-wrap();
				font-size: 14px;
				color: #000000;
			}
			.desc {
				@include no-wrap();
				font-size: 12px;
				color: rgba(0, 0, 0, 0.6);
			}
		}
		.control {
			flex: 0 0 30px;
			width: 30px;
			padding: 0 15px;
			.iconfont {
				font-size: 28px;
				// color: rgba(255, 255, 255, 0.5);
				color: #5b33ac;
				&.mini-icon {
					font-size: 38px;
				}
			}
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg)
		}
	}
}
</style>

