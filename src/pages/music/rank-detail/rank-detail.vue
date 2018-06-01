<template>
	<div class="rank-detail">
		<music-list :bgImage="bgImage" :songList="discList"></music-list>
		<player></player>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api/index'
import {ERR_OK} from '@/api/config'
// import {createSong} from '@/common/js/song'
import {createSong} from '../../../utils/song'
import MusicList from 'components/music/singer/music-list'
import player from 'components/music/player/player'

export default {
  data () {
    return {
      discList: []
    }
  },
  components: {
    MusicList,
    player
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    bgImage () {
      if (this.discList.length) {
        return this.discList[0].image
      }
      return ''
    }
  },
  methods: {
    getDiscDetail () {
      wx.showLoading({
        title: '正在加载...'
      })
      api.getTopListDetail(this.topList.id).then(res => {
        if (res.data.code === ERR_OK) {
          // console.log('res', res)
          let result = res.data.songlist
          this.discList = this.normalizeSiger(result)
          // console.log('歌单详情歌曲', this.discList)
          wx.hideLoading()
        }
      }).catch(error => {
        wx.hideLoading()
        console.log(error)
      })
    },
    normalizeSiger (list) { // 对歌曲信息进行格式化封装
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  onLoad () {
// console.log('this.singer', this.singer)
    wx.setNavigationBarTitle({ // 动态设置页面标题
      title: `${this.topList.topTitle}`
    })
    this.getDiscDetail()
  }
}
</script>


<style lang="scss">

</style>

