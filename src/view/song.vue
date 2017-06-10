<template>
  <transition name="song">
    <div class="song-wrapper" v-show="show">
      <div :style="{backgroundImage: `url(${song.pic_radio})`}" class="bg"></div>
      <div class="prev" @click.stop="prev()"><i class="iconfont">&#xe601;</i></div>
      <div class="song">
        <div class="song-header">
          <div class="title">
              {{song.title}}
          </div>
          <div class="author">
              {{song.author}}
          </div>
        </div>
        <cd :play="playState" :songDetail='song'></cd>
        <div class="barMargin">
          <progressbar></progressbar>
        </div>
        <div class="song-controller-wrapper">
            <songConteroller :play="playState"></songConteroller>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Scroll from '@/components/scroll/scroll'
  import cd from '@/components/cd/cd'
  import progressbar from '@/components/progress/progress'
  import songConteroller from '../components/songController/songController'
  // import { mapState } from 'vuex'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      song: {
        type: Object,
        default() {
          return {}
        }
      },
      playState: {
        type: Boolean,
        default: false
      }
    },
    // computed: {
    //   ...mapState({
    //     song (state) {
    //       return state.song
    //     },
    //     playState (state) {
    //       return state.playState
    //     }
    //   })
    // },
    methods: {
      prev() {
        // this.$router.go(-1)
        this.$emit('songHide')
      }
    },
    components: {
      Scroll,
      cd,
      progressbar,
      songConteroller
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../common/scss/var';
.song-wrapper{
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  right: 0; 
  bottom:0;
  // height: 100%;
  background: #222;
  background-size: cover;
  color: #e8e8e8;
  .bg{
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .6;
    filter: blur(20px);
    z-index: -1;
  }
}
.barMargin{
  position: absolute;
  left: 0;
  bottom: 100px;
  width: 100%;
}
.song-enter-active, .song-leave-active {
  transition: all .3s;
}
.song-enter, .song-leave-active {
  transform: translate3d(0,10%,0);
  opacity: 0;
}
.prev{
  position: absolute;
  top: 0;
  left: 0;
  padding:15px;
  z-index: 2;
  i{
    font-size: 25px;
  }
}
.song-header{
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  margin:0 15px;
  text-align: center;
  padding:15px 0;
  .title{
    font-size: 18px;
  }
}
.song-controller-wrapper{
  padding:0 15px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}
</style>
