
// var Fly = require('flyio/dist/npm/wx')
import Fly from 'flyio/dist/npm/wx'

const http = new Fly()

http.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  return request
})

http.interceptors.response.use(
    (response, promise) => {
      wx.hideNavigationBarLoading()
      return promise.resolve(response)
    },
    (err, promise) => {
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
      return promise.resolve()
    }
  )

export default http
