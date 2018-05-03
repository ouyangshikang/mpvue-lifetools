import {
    TEST
} from './mutation-types.js'

const mutations = {
  [TEST] (state, v) {
    state.test = v
  }
}
export default mutations
