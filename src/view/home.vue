<template>
  <div class="home">
   <Vheader></Vheader>
    <transition name="homeView">
      <keep-alive> 
          <router-view></router-view>
      </keep-alive>
    </transition>
   <controller></controller>
   <!--<search></search>-->
  </div>
</template>
<script>
  import Vheader from '@/components/header/header'
  import controller from '@/components/controller/controller'
  // import search from '@/components/search/search'
  export default {
    data () {
      return {}
    },
    components: {
      Vheader,
      controller
      // search
      // Usersub
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
// .homeView-enter-active, .homeView-leave-active {
//   transition: all .3s
// }
// .homeView-enter, .homeView-leave-active {
//   opacity: 0;
//   transform: translate3d(0,10%,0);
// }
</style>
