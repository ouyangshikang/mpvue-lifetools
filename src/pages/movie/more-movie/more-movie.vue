<template>
	<div class="more-movie">
		<movie-grid :movieData="movies"></movie-grid>
	</div>
</template>

<script>
import MovieGrid from 'components/movie/movie-grid'
import api from '@/api/index'
import {convertToStarsArray} from '../../../utils/util.js'

export default {
  data () {
    return {
      category: '',
      movies: {},
      requestUrl: '',
      totalCount: 0,
      isEmpty: true
    }
  },
  components: {
    MovieGrid
  },
  methods: {
    getMovieData () {
      const url = 'https://douban.uieee.com'
      let dataUrl = ''
      switch (this.category) {
        case '正在热映':
          dataUrl = url + '/v2/movie/in_theaters'
          break
        case '即将上映':
          dataUrl = url + '/v2/movie/coming_soon'
          break
        case '豆瓣Top250':
          dataUrl = url + '/v2/movie/top250'
          break
      }
      this.requestUrl = dataUrl
      wx.showLoading({
        title: '正在加载...'
      })
      api.getMovieData(dataUrl, (res) => {
        this.processDoubanData(res.data)
        wx.hideLoading()
      })
    },

    processDoubanData (data) {
    // console.log(data);
      let movies = []
      for (let idx in data.subjects) {
        let subject = data.subjects[idx]
        let title = subject.title
        if (title.length >= 7) {
          title = title.substring(0, 7) + '...'
        }
        let temp = {
          title: title,
          average: subject.rating.average,
          coverageUrl: subject.images.large,
          movieId: subject.id,
          stars: convertToStarsArray(subject.rating.stars)

        }
        movies.push(temp)
      }
      let totalMovies = {}
      if (!this.isEmpty) {
        totalMovies['movies'] = this.movies.movies.concat(movies)
      } else {
        totalMovies['movies'] = movies
        this.isEmpty = false
      }
    // console.log(movies);
      // this.setData({
      //   movies: totalMovies
      // })
      this.movies = totalMovies
      this.totalCount += 20
      console.log(this.movies)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  },
  onLoad (options) {
    this.category = options.category
    wx.setNavigationBarTitle({ // 动态设置页面标题
      title: `${this.category}`
    })
    this.getMovieData()
  },
  onReachBottom () {
    let nextUrl = this.requestUrl + '?start=' + this.totalCount + '&count=20'
    wx.showNavigationBarLoading()
    api.getMovieData(nextUrl, (res) => {
      this.processDoubanData(res.data)
    })
  },
  onPullDownRefresh () {
    let refreshUrl = this.requestUrl + '?star=0&count=20'
    this.movies = {}
    this.isEmpty = true
    this.totalCount = 0
    // util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '正在加载...'
    })
    api.getMovieData(refreshUrl, (res) => {
      this.processDoubanData(res.data)
      wx.hideLoading()
    })
  },
  onUnload () {
    this.category = ''
    this.movies = {}
    this.isEmpty = true
    this.totalCount = 0
    this.requestUrl = ''
  }
}
</script>


<style lang="scss">

</style>

