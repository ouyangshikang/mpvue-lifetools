<template>
	<div class="search">
		<div class="search-box-wrapper">
      <search-box></search-box>
    </div>
	</div>
</template>

<script>
import SearchBox from './search-box'
export default {
  data () {
    return {

    }
  },
  components: {
    SearchBox
  },
  methods: {

  }
}
</script>


<style lang="scss">
.search {
	.search-box-wrapper {
		margin: 20px;
	}
	.shortcut-wrapper {
		position: fixed;
		top: 178px;
		bottom: 0;
		width: 100%;
		.shortcut {
			height: 100%;
			overflow: hidden;
			.hot-key {
				margin: 0 20px 20px 20px;
				.title {
					margin-bottom: 20px;
					font-size: 12px;
					color: #000;
				}
				.item {
					display: inline-block;
					padding: 5px 10px;
					margin: 0 20px 10px 0;
					border-radius: 6px;
					background: #efefef;
					font-size: 12px;
					color: #000;
				}
			}
		}
	}
	.search-result {
		position: fixed;
		width: 100%;
		top: 178px;
		bottom: 0;
	}
}
</style>

