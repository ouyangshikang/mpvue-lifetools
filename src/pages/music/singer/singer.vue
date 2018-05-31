<template>
	<div>
    <singer-list></singer-list>
    <player></player>
	</div>
</template>

<script>
import SingerList from 'components/music/singer/singer-list'
import player from 'components/music/player/player'

export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    SingerList,
    player
  }
}
</script>


<style lang="scss">

</style>

