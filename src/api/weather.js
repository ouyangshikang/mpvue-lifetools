const baseUrl = 'https://free-api.heweather.com/s6/weather/?key=19713447578c4afe8c12a351d46ea922'

/**
 * requestWeatherByLocation
 * 根据经纬度获取当前城市实时的天气情况
 * @param longitude
 * @param latitude
 * @param callback
 */
function requestWeatherByLocation (longitude, latitude, callback) {
  wx.request({
    url: baseUrl + '&location=' + longitude + ',' + latitude,
    data: {},
    method: 'GET',
    success: function (res) {
      var result = pareseWeahterData(res)
      callback(result)
    },
    fail: function (res) {
      console.log('获取天气信息失败')
      callback(false)
    }
  })
}

/**
 * 解析天气预报数据
 */
function pareseWeahterData (orignData) {
  let data = orignData.data.HeWeather6[0]
  let weather = {
    basic: data.basic, // 基础信心
    now: data.now, // 实况天气
    update: data.update, // 接口更新时间
    daily_forecast: data.daily_forecast, // 天气预报
    hourly: data.hourly, // 逐小时预报
    lifestyle: data.lifestyle // 生活指数
  }
  return weather
}

/**
 * 获取位置信息，返回经纬度
 */
function requestLocation (callback) {
  wx.getLocation({
    type: 'wgs84', // 默认为 wgs84 返回 gps 坐标
    success: function (res) {
      callback(true, res.longitude, res.latitude)
    },
    fail: function (res) {
      callback(false)
    }
  })
}

/**
 * 获取天气回调
 */
export function requestWeatherData (callback) {
  requestLocation((success, longitude, latitude) => {
    if (success === false) {
      latitude = 24.572 // 厦门市集美区坐标
      longitude = 118.100
    }
    requestWeatherByLocation(longitude, latitude, callback)
  })
}
