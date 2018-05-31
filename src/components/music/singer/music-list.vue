<template>
	<div class="music-list">
		<div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
		<!-- <div class="bg-layer" ref="layer"></div> -->
		<div class="song-list-wrapper">
      <song-list :songList="songList" @selectSong="selectSong"></song-list>
    </div>
	</div>
</template>

<script>
import SongList from './song-list'
import {mapActions} from 'vuex'

export default {
  data () {
    return {

    }
  },
  components: {
    SongList
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songList: {
      type: Array,
      default: []
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    ...mapActions([
      'selectPlay'
    ]),
    selectSong (item, index) { // 点击歌曲
      this.selectPlay({
        list: this.songList,
        index
      })
      wx.navigateTo({
        url: `/pages/music/player/main`
      })
    }
  }
}
</script>


<style lang="scss">
.music-list {
  position: relative;
  background: #ffffff;
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 65%;
    transform-origin: top;
    background-size: cover;
    background-position: center 20%;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.3);
    }
  }
  .song-list-wrapper {
    position: absolute;
    top: 100%;
    // bottom: 0;
    width: 100%;
    background: #ffffff;
  }
}
</style>

