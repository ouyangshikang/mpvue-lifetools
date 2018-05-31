// import {playMode} from '@/api/config'
const state = {
  singer: {

  },
  playing: false, // 正在播放
  fullScreen: false, // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: 0,    // 播放模式    0顺序播放  1单曲循环   2随机播放
  currentIndex: -1     // 当前播放的位置
}
export default state
