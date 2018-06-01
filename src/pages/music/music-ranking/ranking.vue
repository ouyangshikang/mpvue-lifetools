<template>
	<div class="rank">
    <div class="toplist">
      <ul>
        <li
          @click="selectItem(item)"
          class="item"
          v-for="(item, kindex) in topList"
          :key="kindex"
        >
          <div class="icon">
            <img :src="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li
              class="song"
              v-for="(song,index) in item.songList"
              :key="index"
            >
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <player></player>
	</div>
</template>

<script>
import player from 'components/music/player/player'
import api from '@/api/index'
import {ERR_OK} from '@/api/config'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      topList: []
    }
  },
  components: {
    player
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    getTopList () {
      wx.showLoading({
        title: '正在加载...'
      })
      api.getTopList().then(res => {
        if (res.data.code === ERR_OK) {
          console.log('res', res)
          this.topList = res.data.data.topList
          wx.hideLoading()
        }
      }).catch(error => {
        wx.hideLoading()
        console.log(error)
      })
    },
    selectItem (item) {
      console.log('排行数据', item)
      wx.navigateTo({
        url: `/pages/music/rank-detail/main?id=${item.id}`
      })
      this.setTopList(item)
    }
  },
  onLoad () {
    this.getTopList()
  }
}
</script>


<style lang="scss">
.rank {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  overflow: scroll;
  background: #efefef;
  .toplist {
    height: 100%;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 70px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: #ffffff;
        color: #000;
        font-size: 12px;
        .song {
          line-height: 26px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          span {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>

