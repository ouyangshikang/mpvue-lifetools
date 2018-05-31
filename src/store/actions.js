import {
  SET_PLAYING_STATE,
  SET_FULL_SCREEN,
  SET_PLAYLIST,
  SET_SEQUENCE_LIST,
  // SET_PLAY_MODE,
  SET_CURRENT_INDEX
} from './mutation-types.js'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(SET_SEQUENCE_LIST, list)
  commit(SET_PLAYLIST, list)
  commit(SET_CURRENT_INDEX, index)
  commit(SET_FULL_SCREEN, true)
  commit(SET_PLAYING_STATE, true)
}
