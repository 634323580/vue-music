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
        <div class="cdLrc-wrapper" @click="toggleFn()">
            <transition name="opacity">
                <div v-show="toggle">
                  <cd :play="playState" :songDetail='song'></cd>
                  <div class="lrc-paragraph">{{this.lrcParagraph}}</div>
                </div>
            </transition>
              <lrc :show="!toggle" :lrc='lrc.lrcMap' :offset="lrcOffset" :currentTime="currentTime"></lrc>
        </div>
        <div class="barMargin">
          <progressbar></progressbar>
        </div>
        <div class="song-controller-wrapper">
            <songConteroller :song="song" :play="playState"></songConteroller>
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
  import lrc from '../components/lrc/lrc'
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
        // 歌词时间和对应的歌词
        lrc: '',
        // 当前歌词段落
        lrcParagraph: '',
        // 当前歌词应该滚动的距离
        lrcOffset: 0,
        // 当前歌词的时间
        currentTime: 0,
        toggle: true
      }
    },
    created () {
      // 播放时间改触发事件
      setTimeout(() => {
        Bus.$on('timeupdate', (s) => {
            if (this.lrc.lrcMap[Math.round(s)]) {
              // 获取当前歌词段落
              this.lrcParagraph = this.lrc.lrcMap[Math.round(s)]
              // 获取当前歌曲滚动的值
              this.lrcOffset = this.lrc.offset[Math.round(s)]
              // 获取当前歌词的时间
              this.currentTime = Math.round(s)
            }
        })
      }, 20)
      this.getLrc()
      this.$nextTick(() => {
        document.getElementById('audio').addEventListener('canplay', () => {
          this.getLrc()
        }, false)
      })
    },
    methods: {
      prev() {
        this.$emit('songHide')
        setTimeout(() => {
          this.toggle = true
        }, 300)
      },
      toggleFn() {
        this.toggle = !this.toggle
      },
      // 歌词解析
      parseLyric(lrc) {
        let lyrics = lrc.split("\n")
        let lrcObj = {
          offset: {},
          lrcMap: {}
        }
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
            lrcObj.lrcMap[time] = clause
            }
        }
          let lrcMap = Object.keys(lrcObj.lrcMap)
          for (let i = 0; i < lrcMap.length; i++) {
              lrcObj.offset[lrcMap[i]] = 30 * i
          }
        return lrcObj
      },
      getLrc() {
        this.$http.get(this.song.lrclink)
                  .then(lrc => {
                    this.lrc = this.parseLyric(lrc.bodyText)
                    this.lrcParagraph = this.song.title
                  })
      }
    },
    watch: {
      song(song) {
        this.lrcParagraph = '歌词加载中...'
        this.lrc.lrcMap && (this.lrc.lrcMap = {})
      }
    },
    components: {
      Scroll,
      cd,
      progressbar,
      songConteroller,
      lrc
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
  bottom: 0;
  width: 100%;
  font-size: 13px;
}
.cdLrc-wrapper{
  position: absolute;
  left: 0;
  top: 65px;
  bottom: 115px;
  width: 100%;
  overflow: hidden;
}

.opacity-enter-active, .opacity-leave-active {
  transition: opacity .3s
}
.opacity-enter, .opacity-leave-active {
  opacity: 0
}
</style>
