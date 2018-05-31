import api from '@/api/index'
import {ERR_OK} from '@/api/config'

// 歌曲类
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id // 歌曲id
    this.mid = mid // 歌曲mid
    this.singer = singer // 歌手
    this.name = name // 歌曲名
    this.album = album // 专辑名称
    this.duration = duration // 歌曲长度
    this.image = image // 歌曲背景图
    this.url = url // 歌曲地址
  }
  getLyric () {
    api.getLyric(this.mid).then(res => {
      if (res.data.code === ERR_OK) {
        this.lyric = res.data.lyric
        console.log(this.lyric)
      }
    })
  }
}

// 创建歌曲的实例
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/${musicData.songmid}.m4a?fromtag=46`
    url: `http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?vkey=3A1E2A2808EC9CCF6CC0D470F65F72CD1DC435336D482531FE9A6E7B76223680BEFF1D3A2E14F3955476B1C281744F8699EF28ABF71CA8D4&guid=1167744950&uin=1062628791&fromtag=66`
  })
}

// 从qq音乐数据中过滤出歌手信息
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
