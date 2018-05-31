export default {
  singer: state => {
    return state.singer
  },
  playing: state => {
    return state.playing
  },
  fullScreen: state => {
    return state.fullScreen
  },
  playList: state => {
    return state.playList
  },
  sequenceList: state => {
    return state.sequenceList
  },
  // 播放模式
  mode: state => {
    return state.mode
  },
  currentIndex: state => {
    return state.currentIndex
  },
  // 当前播放的音乐
  currentSong: state => {
    return state.playList[state.currentIndex] || {}
  }

}
