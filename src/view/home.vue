<template>
  <div class="home">
   <Vheader></Vheader>
    <transition name="homeView">
      <keep-alive> 
          <router-view></router-view>
      </keep-alive>
    </transition>
   <controller ref="controller"></controller>
   <song ref="song" :show="songShow"></song>
   <!--<search></search>-->
  </div>
</template>
<script>
  import Vheader from '@/components/header/header'
  import controller from '@/components/controller/controller'
  import song from '@/view/song'
  // import search from '@/components/search/search'
  export default {
    data () {
      return {
        songShow: false
      }
    },
    created () {
      this.$nextTick(() => {
        this.$refs.controller.$on('songShow', () => {
          this.songShow = true
        })
        this.$refs.song.$on('songHide', () => {
          this.songShow = false
        })
      })
    },
    components: {
      Vheader,
      controller,
      song
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
