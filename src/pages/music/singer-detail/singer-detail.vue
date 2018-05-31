<template>
	<div class="singer-detail">
		<music-list :bgImage="bgImage" :songList="songList"></music-list>
		<player></player>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api/index'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import MusicList from 'components/music/singer/music-list'
import player from 'components/music/player/player'

export default {
  data () {
    return {
      songList: []
    }
  },
  components: {
    MusicList,
    player
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    bgImage () {
      return this.singer.avatar
    }
  },
  methods: {
    getSingerDetail () {
      wx.showLoading({
        title: '正在加载...'
      })
      api.getSingerDetail(this.singer.id).then(res => {
        if (res.data.code === ERR_OK) {
          this.songList = this.normalizeSiger(res.data.data.list)
          console.log('歌手详情歌曲', this.songList)
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
        let {musicData} = item
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
      title: `${this.singer.name}`
    })
    this.getSingerDetail()
  }
}
</script>


<style lang="scss">

</style>

