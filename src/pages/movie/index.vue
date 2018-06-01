<template>
  <div class="movie">
      <div class="search">
        <icon type="search" size="15" color="#405f80" class="search-img"/>
        <input
          type="text"
          placeholder="摔跤吧,爸爸"
          placeholder-class="placeholder"
          @focus="bindFocus"
          @confirm="bindConfirm"
          @blur="bindConfirm"
          :value="initValue"
        />
        <i class="xx-img iconfont icon-quxiao" v-if="xxImageShow" @click="cancelTap"></i>
      </div>
      <div class="container" v-if="containerShow" >
        <div class="movies-template">
          <movie-list :movieData="inTheater"></movie-list>
        </div>
        <div class="movies-template">
          <movie-list :movieData="comingSoon"></movie-list>
        </div>
        <div class="movies-template">
          <movie-list :movieData="top250"></movie-list>
        </div>
      </div>

      <div class="search-panel" v-if="searchPannelShow">
          <movie-grid :movieData="searchResult"></movie-grid>
      </div>
  </div>
</template>

<script>
import MovieList from 'components/movie/movie-list'
import MovieGrid from 'components/movie/movie-grid'
import {convertToStarsArray} from '../../utils/util.js'
import api from '@/api/index'
export default {
  data () {
    return {
      inTheater: {},
      comingSoon: {},
      top250: {},
      containerShow: true,
      searchPannelShow: false,
      xxImageShow: false,
      searchResult: {},
      initValue: ''
    }
  },
  components: {
    MovieList,
    MovieGrid
  },
  methods: {
    getMovieData () {
      const url = 'https://douban.uieee.com'
      let inTheatersUrl = url + '/v2/movie/in_theaters' + '?start=0&count=3'
      let comingSoonUrl = url + '/v2/movie/coming_soon' + '?start=0&count=3'
      let top250Url = url + '/v2/movie/top250' + '?start=0&count=3'
      api.getMovieData(inTheatersUrl, (res) => {
        this.inTheater = this.processDoubanData(res.data, 'inTheater', '正在热映')
        // console.log(this.inTheater)
      })
      api.getMovieData(comingSoonUrl, (res) => {
        this.comingSoon = this.processDoubanData(res.data, 'comingSoon', '即将上映')
        // console.log(this.comingSoon)
      })
      api.getMovieData(top250Url, (res) => {
        this.top250 = this.processDoubanData(res.data, 'top250', '豆瓣Top250')
        // console.log(this.top250)
      })
    },
    processDoubanData (data, settedKey, categoryTitle) {
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
      // console.log(movies)
      let readyData = {}
      readyData = {
        movies: movies,
        categoryTitle: categoryTitle
      }
      return readyData
      // console.log('readyData', this.settedKey)
    },
    bindFocus (event) {
      this.containerShow = false
      this.searchPannelShow = true
      this.xxImageShow = true
    },
    bindConfirm (event) {
      let text = event.mp.detail.value
      // console.log(text)
      let searchUrl = 'https://douban.uieee.com/v2/movie/search?q=' + text
      this.initValue = text
      // this.getMovieListData(searchUrl, 'searchResult', '')
      wx.showNavigationBarLoading()
      api.getMovieData(searchUrl, (res) => {
        this.searchResult = this.processDoubanData(res.data, 'searchResult', '')
        // console.log('搜索结果是', this.searchResult)
        wx.hideNavigationBarLoading()
      })
    },
    cancelTap (event) {
      this.searchPannelShow = false
      this.xxImageShow = false
      this.containerShow = true
      this.searchResult = {}
      this.initValue = ''
    }
  },
  created () {
    this.getMovieData()
  }
}
</script>

<style lang="scss">
.movie {
  .search {
    background-color: #f2f2f2;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    &-img {
      margin: auto 0 auto 10px;
    }
    input {
      height: 100%;
      width: 300px;
      margin-left: 20px;
      font-size: 14px;
    }
    .placeholder {
      font-size: 14px;
      color: #d1d1d1;
      margin-left: 10px;
    }
    .icon-quxiao {
      margin: auto 5px auto 5px;
      padding: 0 10px;
    }
  }
  .container{
    background-color: #f2f2f2;
    color:#333;
    .movies-template{
      margin-bottom: 30rpx;
    }
  }
  .search-panel{
    position: absolute;
    top: 40px;
  }
}
</style>
