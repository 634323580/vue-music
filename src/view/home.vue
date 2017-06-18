<template>
  <div class="home">
   <Vheader></Vheader>
      <keep-alive> 
          <router-view></router-view>
      </keep-alive>
   <controller ref="controller" :song="song" :playState="playState"></controller>
   <song ref="song" :song="song" :playState="playState" :show="songShow"></song>
    <playList></playList>
   <!--<search></search>-->
  </div>
</template>
<script>
  import Vheader from '@/components/header/header'
  import controller from '@/components/controller/controller'
  import song from '@/view/song'
  import playList from '../components/playList/playList'
   import { mapState } from 'vuex'
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
    computed: {
      ...mapState({
        song (state) {
          return state.song
        },
        playState (state) {
          return state.playState
        }
      })
    },
    components: {
      Vheader,
      controller,
      song,
      playList
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
