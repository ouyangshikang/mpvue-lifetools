<template>
	<div class="movie-grid">
		<div class="grid-container"  enable-back-to-top="true">
      <div class="single-view-container" v-for="movie in movieData.movies" :key="movie">
        <!-- <template is="movieTemplate" data="{{...movie}}" /> -->
				<div  
					class="movie-container"
					@click="movieTap"
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
    movieTap (event) {
      let movieId = event.currentTarget.dataset.movieid
      console.log(movieId)
      wx.navigateTo({
        url: '/pages/movie/detail-movie/main?id=' + movieId
      })
    }
  }
}
</script>


<style lang="scss">
.movie-grid {
	.grid-container{
    height: 650px;
		margin:20px 0 20px 3px;
		.single-view-container{
			/*float:left;*/
			margin-bottom: 20px;
			display: inline-block;
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

