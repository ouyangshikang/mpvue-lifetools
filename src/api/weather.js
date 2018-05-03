import request from '../utils/http'
const baseUrl1 = 'https://free-api.heweather.com/s6/weather?key=19713447578c4afe8c12a351d46ea922'
// const baseUrl = 'https://free-api.heweather.com/s6/weather/?key=a33cc4b1e5894d958ab154a0dcf836ae'
const baseUrl2 = 'https://free-api.heweather.com/s6/air?key=19713447578c4afe8c12a351d46ea922'
const api = {
  /**
   * 根据坐标获取当前城市的天气数据
   */
  getWeatherData (longitude, latitude) {
    return request.get(baseUrl1, {location: `${longitude},${latitude}`})
  },
  getAirData (longitude, latitude) {
    return request.get(baseUrl2, {location: `${longitude},${latitude}`})
  }
}

export default api
