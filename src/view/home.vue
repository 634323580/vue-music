<template>
  <div class="home">
   <Vheader></Vheader>
   <router-view></router-view>
   <controller></controller>
  </div>
</template>

<script>
  import Vheader from '@/components/header/header'
  import controller from '@/components/controller/controller'
  export default {
    data () {
      return {}
    },
    components: {
      Vheader,
      controller
      // Usersub
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
