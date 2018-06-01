<template>
	<div class="song-list">
		<ul>
			<li class="item" v-for="(song, index) in songList" :key="song" @click="selectSong(song, index)">
				<div class="content">
					<h2 class="name">{{song.name}}</h2>
					<p class="desc">{{song.singer}}·{{song.album}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    songList: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer}·${song.album}`
    },
    selectSong (item, index) {
      this.$emit('selectSong', item, index)
    }
  }
}
</script>


<style lang="scss">
@import "@/common/css/mixin.scss";
.song-list {
	padding: 15px 0 60px 0;
	.item {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 64px;
		font-size: 15px;
		padding: 0 30px;
		&:active {
			background: rgba(204, 204, 204, 0.6);
		}
		.content {
			flex: 1;
			line-height: 20px;
			overflow: hidden;
			.name{
				@include no-wrap();
				color: #000000;
			}
			.desc{
				@include no-wrap();
				margin-top: 4px;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.5);
			}
		}
	}
}
</style>

