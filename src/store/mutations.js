import {
  SET_SINGER,
  SET_PLAYING_STATE,
  SET_FULL_SCREEN,
  SET_PLAYLIST,
  SET_SEQUENCE_LIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX
} from './mutation-types.js'

const mutations = {
  // 歌手详情列表
  [SET_SINGER] (state, singer) { // state状态树， v为传进来的参数
    state.singer = singer
  },
  // 播放器页面
  [SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }

}
export default mutations
