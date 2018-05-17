import http from '../utils/http'

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
      key: 'a33cc4b1e5894d958ab154a0dcf836ae'
    })
  }
}

export default api
