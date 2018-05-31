<template>
	<div class="detail-movie">
		<img class="head-img" :src="movie.movieImg" mode="aspectFill">
    <div class="head-img-hover" :data-src="movie.movieImg" @click="viewMoviePostImg">
      <span class="main-title">{{movie.title}}</span>
      <span class="sub-title">{{movie.country + " · "+movie.year}}</span>
      <div class="like">
        <span class="highlight-font">
          {{movie.wishCount}}
        </span>
        <span class="plain-font">
          人喜欢
        </span>
        <span class="highlight-font">
          {{movie.commentCount}}
        </span>
        <span class="plain-font">
          条评论
        </span>
      </div>
    </div>

    <img
      class="movie-img"
      :src="movie.movieImg"
      :data-src="movie.movieImg"
      @click="viewMoviePostImg"
    />
    <div class="summary">
      <div class="original-title">
        <span>{{movie.originalTitle}}</span>
      </div>
      <div class="flex-row">
        <span class="mark">评分</span>
        <!-- <template is="starsTemplate" data="{{stars:movie.stars, score:movie.score}}" /> -->
        <star :average="movie.average" :stars="movie.stars" ></star>
      </div>
      <div class="flex-row">
        <span class="mark">导演</span>
        <span>{{movie.director.name}}</span>
      </div>
      <div class="flex-row">
        <span class="mark">主演</span>
        <span>{{movie.casts}}</span>
      </div>
      <div class="flex-row">
        <span class="mark">类型</span>
        <span>{{movie.generes}}</span>
      </div>
    </div>

    <div class="hr"></div>
    <div class="synopsis">
      <span class="synopsis-font">剧情简介</span>
      <span class="summary-content">{{movie.summary}}</span>
    </div>

    <div class="hr"></div>
    <div class="cast">
      <span class="cast-font">主演</span>
      <scroll-view class="cast-imgs" scroll-x="true" style="width:100%">
        <div
          class="cast-container"
          :data-src="item.img"
          @click="viewMoviePostImg"
          v-for="(item, index) in movie.castsInfo"
          :key="index"
        >
          <img class="cast-img" :src="item.img">
          <span class="cast-name">{{item.name}}</span>
        </div>
      </scroll-view>
    </div>
	</div>
</template>

<script>
import star from 'components/movie/star'
import Movie from '../../../utils/movie.js'
export default {
  data () {
    return {
      movie: {},
      movieId: 0
    }
  },
  components: {
    star
  },
  methods: {
    getMovieInfo (mid) {
      const url = 'https://douban.uieee.com' + '/v2/movie/subject/' + mid
      let movie = new Movie(url)
      console.log('zuihou', movie)
      movie.getMovieData((movie) => {
        this.movie = movie
      })
    },
    viewMoviePostImg (e) {
      var src = e.currentTarget.dataset.src
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    }
  },
  onLoad (options) {
    console.log(options)
    this.movieId = options.id
    this.getMovieInfo(this.movieId)
  },
  onUnload () {
    this.movie = {}
    this.movieId = 0
  }
}
</script>


<style lang="scss">
.detail-movie {
  display:flex;
  flex-direction: column;
  .head-img{
    width:100%;
    height: 320rpx;
    filter:blur(15px);
    -webkit-filter:blur(15px);
  }
  .head-img-hover{
    width: 100%;
    height: 320rpx;
    position:absolute;
    top:0;
    left:0;
    display:flex;
    flex-direction: column;
    .main-title{
      font-size: 19px;
      color:#fff;
      font-weight:bold;
      margin-top: 50rpx;
      margin-left: 40rpx;
      letter-spacing: 2px;
    }
    .sub-title{
      font-size: 28rpx;
      color:#fff;
      margin-left: 40rpx;
      margin-top: 30rpx;
    }
    .like{
      display:flex;
      flex-direction: row;
      margin-top: 30rpx;
      margin-left: 40rpx;
      .highlight-font{
        color: #ff0000;
        font-size:22rpx;
        margin-right: 10rpx;
      }
      .plain-font{
        color: #999;
        font-size:22rpx;
        margin-right: 30rpx;
      }
    }
  }
  .movie-img{
    height:238rpx;
    width: 175rpx;
    position: absolute;
    top:160rpx;
    right: 30rpx;
  }
  .summary{
    margin-left:40rpx;
    margin-top: 40rpx;
    color: #777777;
    font-size: 13px;
    .original-title{
      color: #1f3463;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 40rpx;
      width:500rpx;
    }
    .flex-row{
      display:flex;
      flex-direction: row;
      margin-bottom: 10rpx;
      .mark{
        margin-right: 30rpx;
        white-space:nowrap;
        color: #999999;
      }
    }
  }

  .hr{
    margin-top:45rpx;
    height:1px;
    width: 100%;
    background-color: #d9d9d9;
  }
  .synopsis{
    margin-left:40rpx;
    display:flex;
    flex-direction: column;
    margin-top: 50rpx;
    font-size: 13px;
    .synopsis-font{
      color:#999;
      font-size: 14px;
    }
    .summary-content{
      margin-top: 20rpx;
      margin-right: 40rpx;
      line-height:40rpx;
      letter-spacing: 1px;
    }
  }

  .cast{
    margin-left:40rpx;
    display:flex;
    flex-direction: column;
    margin-top:50rpx;
    font-size: 13px;
    .cast-font{
      color: #999;
      margin-bottom: 40rpx;
      font-size: 14px;
    }
    .cast-imgs{
      white-space: nowrap;
      .cast-container{
        display:inline-flex;
        flex-direction: column;
        margin-bottom: 50rpx;
        margin-right: 40rpx;
        width: 170rpx;
        text-align:center;
        white-space: normal;
        .cast-img{
          width: 170rpx;
          height: 210rpx;
        }
        .cast-name{
          margin: 10rpx auto 0;
        }
      }
    }
  }

}
</style>

