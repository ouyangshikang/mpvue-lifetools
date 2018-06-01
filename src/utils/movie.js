import {convertToStarsArray, convertToCastString, convertToCastInfos} from './util'
import api from '@/api/index'

export default class Movie {
  constructor (url) {
    this.url = url // url绑定在class实例上
  }

  getMovieData (callback) {
    this.callback = callback
    // util.http(this.url, this.processDoubanData.bind(this))
    api.getMovieData(this.url, (res) => {
      this.processDoubanData(res.data)
    })
  }

  processDoubanData (data) {
    if (!data) {
      return
    }
    var director = {
      avatar: '',
      name: '',
      id: ''
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }
    var movie = {
      movieImg: data.images ? data.images.large : '', // 电影海报
      country: data.countries[0],   // 制片国家/地区
      title: data.title,     // 电影题目
      originalTitle: data.original_title, // 原名
      wishCount: data.wish_count,  // 想看的人数
      commentCount: data.comments_count,   // 短评数量
      year: data.year,  // 年代
      generes: data.genres.join('、'), // 影片类型
      stars: convertToStarsArray(data.rating.stars),
      score: data.rating.average,   // 评分
      director: director,  // 导演
      casts: convertToCastString(data.casts), // 主演
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary  // 简介
    }
    this.callback(movie)
  }
}
