<template>
  <!--night-->
  <div id="app" :class="{night: night}">
    <router-view></router-view>
    <Play></Play>
  </div>
</template>

<script>
import Play from '@/components/play/play'
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState({
      night: state => state.night
    })
  },
  components: {
    Play
  }
}
</script>

<style lang="scss">
body,html,#app{
  height: 100%;
}

</style>
