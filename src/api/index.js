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
  }
}

export default api
