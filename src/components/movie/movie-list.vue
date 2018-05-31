<template>
	<div class="movie-list">
    <div class="inner-container">
      <div class="movie-head">
        <span class="slogan">{{movieData.categoryTitle}}</span>
        <div class="more" @click="moreTap" :data-category="movieData.categoryTitle">
          <span class="more-text">更多</span>
          <span class="more-img">></span>
        </div>
      </div>

      <div class="movies-container">
				<div  
					class="movie-container"
					@click="movieTap"
					v-for="movie in movieData.movies"
					:key="movie"
					:data-movieId="movie.movieId"
				>
					<img class="movie-img" :src="movie.coverageUrl">
					<span class="movie-title">{{movie.title}}</span>
					<star :average="movie.average" :stars="movie.stars" ></star>
				</div>
      </div>
    </div>
	</div>
</template>

<script>
import star from './star'
export default {
  data () {
    return {

    }
  },
  props: {
    movieData: {
      type: Object,
      default: {}
    }
  },
  components: {
    star
  },
  methods: {
    moreTap (event) {
      // console.log(event)
      let category = event.currentTarget.dataset.category
      // console.log(category)
      wx.navigateTo({
        url: '/pages/movie/more-movie/main?category=' + category
      })
    },

    movieTap (event) {
      let movieId = event.currentTarget.dataset.movieid
      console.log(movieId)
      wx.navigateTo({
        url: '/pages/movie/detail-movie/main?id=' + movieId
      })
    }
  },
  mounted () {
    console.log('传过来', this.movieData)
  }
}
</script>


<style lang="scss">
.movie-list {
	background-color: #fff;
  display: flex;
  flex-direction: column;
	.inner-container {
		margin: 0 auto 10px;
		.movie-head {
			padding: 10px 10px 11px;
			.slogan {
				font-size: 12px;
			}
			.more {
				float: right;
				.more-text {
					font-size: 12px;
					vertical-align: middle;
					margin-right: 5px;
					color: #5b33ac;
				}
				.more-img {
					width: 5px;
					height: 8px;
					vertical-align: middle;
					font-size: 14px;
				}
			}
		}
		.movies-container {
			display:flex;
			flex-direction: row;
			.movie-container {
				display: flex;
				flex-direction: column;
				padding: 0 11px;
				.movie-img {
					width: 100px;
					height: 135px;
					padding-bottom: 10px;
				}
				.movie-title{
					margin-bottom: 8px;
					font-size: 12px;
				}
			}
		}
	}
	
}
</style>

