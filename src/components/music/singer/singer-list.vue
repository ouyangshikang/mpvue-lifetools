<template>
	<div class="singer-list">
		<listview :singerData="singers" @jmp="jmpDetail"></listview>
	</div>
</template>

<script>
import api from '@/api/index'
import {ERR_OK} from '@/api/config'
// import Singer from '@/common/js/singer'
import Singer from '../../../utils/singer'
import listview from './listview'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      singers: []
    }
  },
  components: {
    listview
  },
  methods: {
    jmpDetail (singer) { // 跳转到歌手详情页面
      console.log('歌手信息', singer)
      wx.navigateTo({
        url: `/pages/music/singer-detail/main?id=${singer.id}`
      })
      this.setSinger(singer)
    },

    getSingerList () {
      wx.showLoading({
        title: '正在加载...'
      })
      api.getSingerList().then(res => {
        if (res.data.code === ERR_OK) {
          this.singers = this.normalizeSiger(res.data.data.list)
          console.log(this.singers)
          wx.hideLoading()
        }
      }).catch(error => {
        wx.hideLoading()
        console.log(error)
      })
    },
// 对歌手数据进行格式化处理
    normalizeSiger (list) {
      let map = { // map的结构： hot: [title, item],  A: [...] , B: [...], C.....
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
// 将map对象处理成有序的数组的形式
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title === '热门') {
          hot.push(val)
        } else if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  created () {
    this.getSingerList()
  }
}
</script>


<style lang="scss">

</style>

