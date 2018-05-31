<template>
	<div class="listview">
		<ul>
      <li
				v-for="(group, groopIndex) in singerData"
				class="list-group"
				:key="groopIndex"
			>
        <h2 class="list-groop-title">{{group.title}}</h2>
        <ul>
          <li
						v-for="item in group.items"
						:key="item"
						@click="jmpDetail(item)"
						class="list-group-item"
					>
            <img :src="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
		<!-- 右侧导航部分 -->
		<div
			class="list-shortcut"
			@touchstart.stop.prevent="onShortCutTouchStart"
			@touchmove.stop.prevent="onShortCutTouchMove"
		>
      <ul>
        <li
					v-for="(item, index) in shortCutList"
					:key="item"
          class="item"
          :class="{'current': index === currentIndex}"
          :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      touch: {},
      listHeight: []
    }
  },
  props: {
    singerData: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortCutList () {
      return this.singerData.map((item) => {
        return item.title.substring(0, 1)
      })
    }
  },
  methods: {
    jmpDetail (item) {
      this.$emit('jmp', item)
    },
    onShortCutTouchStart (e) {
      console.log(this.listHeight)
      let anchorIndex = e.target.dataset.index
      console.log('anchorIndex', anchorIndex)
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      // this._scrollTo(anchorIndex)
    },
    onShortCutTouchMove (e) {

    },
    calculateHeight () { // 计算歌手列表数据的高度
      let height = 0
      wx.createSelectorQuery().selectAll('.list-group').boundingClientRect(rects => {
        console.log('rects:', rects)
        rects.forEach(rect => {
          height += rect.height
          this.listHeight.push(height)
        })
        console.log('listHeight:', this.listHeight)
      }).exec()
      // console.log('list:', list)
      // this.listHeight.push(height)
      // for (let i = 0; i < list.length; i++) {
      //   let item = list[i]
      //   height += item.clientHeight
      //   this.listHeight.push(height)
      // }
    }
  },
  created () {
    // this.touch = {}
    // this.listHeight = []
  },
  onReady () {
    this.calculateHeight()
  },
  onLoad () {
    this.calculateHeight()
  }
}
</script>


<style lang="scss">
.listview {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: scroll;
	background: #ffffff;
	.list-group{
    padding-bottom: 5px;
    &:last-child {
      padding-bottom: 60px;
    }
		.list-groop-title{
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			font-size: 12px;
			color: #5b33ac;
			background: #f3f3f3;
			font-weight: bold;
		}
		.list-group-item{
			display: flex;
			align-items: center;
      padding: 10px 0 10px 30px;
			&:active {
				background: rgba(204, 204, 204, 0.5);
			}
			.avatar{
				width: 50px;
        height: 50px;
        transform: rotate(0deg);
				border-radius: 50%;
			}
			.name{
				margin-left: 20px;
				color: #000000;
				font-size: 14px;
			}
		}
	}

	.list-shortcut{
		position: fixed;
		z-index: 30;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		padding: 10px 0;
		border-radius: 10px;
		text-align: center;
		background: #e8e8e8;
		font-family: Helvetica;
		cursor: pointer;
		.item{
			padding: 3px;
			line-height: 1;
			color: #0f0e0e;
			font-size: 14px;
			&.current{
					color: #5b33ac;
			}
		}
	}
}
</style>

