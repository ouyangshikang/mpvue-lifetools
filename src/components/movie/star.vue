<template>
	<div class="star">
		<div class="stars" v-for="item in stars" :key="item">
			<img v-if="item" src="../../../static/img/star.png">
			<img v-else src="../../../static/img/none-star.png">
		</div>
    <span class="star-score">{{average}}</span>
	</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    stars: {

    },
    average: {

    }
  },
  methods: {

  }
}
</script>


<style lang="scss">
.star {
	display: flex;
  flex-direction: row;
	.stars {
		display: flex;
		height: 8px;
		margin-right: 1px;
		margin-top: 5px;
		img {
			padding-left: 2px;
			height: 8px;
			width: 8px;
		}
	}
	.star-score{
		// height: 8px;
		margin-left: 8px;
		font-size: 12px;
		color: #1f3463;
	}
}
</style>

