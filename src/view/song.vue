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
        <div class="lrc-paragraph">{{this.lrcParagraph}}</div>
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
  import Bus from '@/common/js/bus'
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
    data () {
      return {
        lrc: '',
        lrcParagraph: '',
        lrcIndex: 0
      }
    },
    created () {
      Bus.$on('timeupdate', (s) => {
          if (this.lrc.get(Math.round(s))) {
            this.lrcParagraph = this.lrc.get(Math.round(s))
            // for (let [key, value] of this.lrc.entries()) {
            //     console.log(key, value)
            // }
          }
      })
    },
    methods: {
      prev() {
        // this.$router.go(-1)
        this.$emit('songHide')
      },
      parseLyric(lrc) {
        let lyrics = lrc.split("\n")
        let lrcObj = new Map()
        for (let i = 0; i < lyrics.length; i++) {
            let lyric = decodeURIComponent(lyrics[i])
            let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
            let timeRegExpArr = lyric.match(timeReg)
            if (!timeRegExpArr) continue
            let clause = lyric.replace(timeReg, '')
            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k]
            let min = Number(String(t.match(/\[\d*/i)).slice(1))
            let sec = Number(String(t.match(/:\d*/i)).slice(1))
            let time = min * 60 + sec
            // lrcObj[time] = clause
            lrcObj.set(time, clause)
            }
        }
        return lrcObj
      }
    },
    watch: {
      song(song) {
        this.lrcParagraph = '歌词加载中...'
        this.$http.get(song.lrclink)
                  .then(lrc => {
                    this.lrcIndex = 0
                    this.lrc = this.parseLyric(lrc.bodyText)
                    this.lrcParagraph = song.title
                  })
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
  bottom: 80px;
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
  padding:10px 0;
  .title{
    font-size: 18px;
  }
}
.song-controller-wrapper{
  padding:0 15px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}
.lrc-paragraph{
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 110px;
  width: 100%;
  font-size: 13px;
}
</style>
