<template>
  <!--night-->
  <div id="app" :class="{night: night}">
    <!--<router-view></router-view>-->
    <home></home>
    <Play></Play>
  </div>
</template>

<script>
import Play from '@/components/play/play'
import home from './view/home'
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState({
      night: state => state.night
    })
  },
  components: {
    Play,
    home
  }
}
</script>

<style lang="scss">
body,html,#app{
  height: 100%;
}

</style>
