<template>
  <div class="home">
   <Vheader></Vheader>
   <!--<Usersub></Usersub>-->
   <router-view></router-view>
  </div>
</template>

<script>
  import Vheader from '@/components/header/header'
  // import Usersub from '@/components/Usersub/Usersub'
  export default {
    data () {
      return {}
    },
    components: {
      Vheader
      // Usersub
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
