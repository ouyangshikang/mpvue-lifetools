// import Fly from 'flyio'
// import wx from './wx'
var Fly = require('flyio/dist/npm/wx')

const request = new Fly()

// request.interceptors.request.use((request) => {
//   wx.showNavigationBarLoading()
//   return request
// })

// request.interceptors.response.use(
//   (response, promise) => {
//     wx.hideNavigationBarLoading()
//     return promise.resolve(response.data)
//   },
//   (err, promise) => {
//     wx.hideNavigationBarLoading()
//     wx.showToast({
//       title: err.message,
//       icon: 'none'
//     })
//     return promise.resolve()
//   }
// )

export default request
