<template>
	<div class="player-container">
		<player></player>
	</div>
</template>

<script>
import player from 'components/music/player/player'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    player
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  computed: {

  },
  onLoad () {
  },
  onUnload () {
    this.setFullScreen(false)
    // this.innerAudioContext.destroy()
  }
}
</script>


<style lang="scss">
	.player-container {
	}

</style>

