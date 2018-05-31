import http from '../utils/http'
import {commonParams} from './config'

const baseUrl = 'https://free-api.heweather.com/s6/'
const api = {
  /**
   * 根据坐标获取当前城市的天气数据
   */
  getWeatherData (longitude, latitude) {
    return http.get(`${baseUrl}weather`, {
      location: `${longitude},${latitude}`,
      key: '19713447578c4afe8c12a351d46ea922'
    })
  },
  /**
   * 根据坐标获取当前城市的空气质量数据
   */
  getAirData (longitude, latitude) {
    return http.get(`${baseUrl}air`, {
      location: `${longitude},${latitude}`,
      key: '19713447578c4afe8c12a351d46ea922'
    })
  },
  /**
   *  获取歌单数据
   */
  getDiscList () {
    const url = 'http://ustbhuangyi.com/music/api/getDiscList'
    const data = Object.assign({}, commonParams, {
      rnd: Math.random(),
      loginUin: 0,
      hostUin: 0,
      platform: 'yqq',
      needNewCode: 0,
      categoryId: 10000000,
      sortId: 5,
      sin: 0,
      ein: 29,
      format: 'json'
    })
    return http.get(url, data)
  },
  /**
   * 获取歌手数据
   */
  getSingerList () {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
      rnd: Math.random(),
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      format: 'json'
    })
    return http.get(url, data)
  },
  /**
   * 获取歌手详情数据
   */
  getSingerDetail (singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
      singermid: singerId,
      format: 'json'
    })

    return http.get(url, data)
  },
  /**
   * 获取歌曲的歌词
   */
  getLyric (mid) {
    const url = 'http://ustbhuangyi.com/music/api/lyric'
    const data = Object.assign({}, commonParams, {
      songmid: mid,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      categoryId: 10000000,
      pcachetime: +new Date(),
      format: 'json'
    })
    return http.get(url, data)
  },
  /**
   * 获取歌单的歌曲列表
   */
  getDiscSongList (disstid) {
    const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      format: 'json'
    })
    return http.get(url, data)
  },
  /**
   * 获取排行榜的歌曲数据
   */
  getTopList () {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const data = Object.assign({}, commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5',
      format: 'json'
    })
    return http.get(url, data)
  },
  /**
   * 获取排行榜具体数据
   */
  getTopListDetail (topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const data = Object.assign({}, commonParams, {
      topid,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5',
      format: 'json'
    })

    return http.get(url, data)
  }
}

export default api
