<template>
    <transition name="playList">
        <div class="play-list-wrapper" v-show="playListToggle">
                <div class="playListMask" v-show="playListToggle" @click="hide()"></div>
                    <div class="play-list" ref="playList">
                        <div class="playList-header border-1px">
                            <mode :title="true" size="22"></mode>
                            <div class="clear" @click="clear()">
                                <i class="iconfont">&#xe673;</i>清空
                            </div>
                        </div>
                        <scroll ref='scroll' :data='items'>
                            <ul>
                                <li class="list border-1px" v-for="item in items" @click="fileLink(item)" :key="item.song_id" :class="{active: songId === item.song_id}">
                                    <i v-if="songId === item.song_id" class="iconfont">&#xe602;</i>
                                    <span class="title">
                                        {{item.title || item.songname}}
                                    </span>
                                    -
                                    <span class="artistname">
                                        {{item.author || item.artistname}}
                                    </span>
                                </li>
                            </ul>
                        </scroll>
                </div>
            </div>
    </transition>
</template>
<script>
import scroll from '../scroll/scroll'
import mode from '@/components/mode/mode'
import Utils from '@/common/js/utils.js'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            items: []
        }
    },
    created () {
      this.$store.commit('setPlayList', localStorage.playList && JSON.parse(localStorage.playList) || [])
    },
    methods: {
        hide() {
            this.$store.commit('playListToggle', false)
        },
        fileLink(id) {
            Utils.getSong(id)
        },
        clear() {
            localStorage.removeItem('current_song')
            localStorage.removeItem('playList')
            localStorage.removeItem('songIndex')
            localStorage.removeItem('songPrevIndex')
            this.$store.commit('setSong', {})
            this.$store.commit('setSongId', Number)
            this.$store.commit('setPlayState', {state: false})
            this.$store.commit('setPlayList', [])
            this.$store.commit('playListToggle', false)
        },
        __autoScroll(time) {
            setTimeout(() => {
                let currentHeight = 35 * (parseInt(localStorage.songIndex) + 1)
                let playListH = this.$refs.playList.offsetHeight
                if (currentHeight >= playListH / 1.5) {
                    this.$refs.scroll.scrollTo(0, -(currentHeight - playListH / 2), time)
                } else {
                    this.$refs.scroll.scrollTo(0, 0, time)
                }
            }, 20)
        }
    },
    computed: {
      ...mapState({
          playListToggle(state) {
            // 打开后自动滚到当前歌曲
            if (state.playListToggle) {
                this.__autoScroll(0)
            }
            return state.playListToggle
          },
          setPlayLis(state) {
              return state.playList
          },
        songId (state) {
            // setTimeout(() => {
            //     if (!(this.$refs.scroll.scroll.y <= (this.$refs.scroll.scroll.maxScrollY))) {
            //         this.__autoScroll(300)
            //     }
            // }, 20)
            return state.songId
        }
      })  
    },
    watch: {
        playListToggle() {
            setTimeout(() => {
                this.$refs.scroll.refresh()
            }, 20)
        },
        setPlayLis(list) {
            this.items = list
        }
    },
    components: {
        scroll,
        mode
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
@import '../../common/scss/mixin';
.play-list-wrapper{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20
}
.playListMask{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 1);
    z-index: 20;
    opacity: 0;
    animation: opacitys .3s .3s forwards;
}
.play-list{
    position: absolute;
    top: 40%;
    bottom: 0;
    right: 0;
    left: 0;
    background: $dayBg;
    overflow: hidden;
    z-index: 21;
    padding: 0 15px 35px;
    .list{
        line-height: 35px;
        height: 35px;
        font-size: 14px;
        @include border-1px($day-border);
        font-size: 14px;
        color:$day-color;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space:  nowrap;
        &.active{
            color: $dayTheme;
        }
    }
}
.playList-enter-active, .playList-leave-active {
  transition: all .3s
}
.playList-enter, .playList-leave-active {
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.playList-header{
    display: flex;
    justify-content: space-between;
    margin: 0 -15px;
    height: 35px;
    line-height: 35px;
    background: $dayBg;
    @include border-1px($day-border);
    position: relative;
    z-index: 2;
    padding:0 15px;
    .clear{
        .iconfont{
            font-size: 14px;
            color:#999;
            margin-right: 5px;
        }
    }
}
@keyframes opacitys{
    0%{
        opacity: 0;
    }
    100%{
        opacity: .6;
    }
}
</style>
