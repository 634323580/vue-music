<template>
  <!--night-->
  <div id="app" class="">
    <router-view></router-view>
    <Play></Play>
  </div>
</template>

<script>
import Play from '@/components/play/play'
export default {
  name: 'app',
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
