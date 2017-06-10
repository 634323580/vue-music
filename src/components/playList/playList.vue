<template>
    <transition name="playList">
        <div class="play-list-wrapper" v-show="playListToggle">
                <div class="playListMask" v-show="playListToggle" @click="hide()"></div>
                    <div class="play-list">
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
        }
    },
    computed: {
      ...mapState({
          playListToggle(state) {
            return state.playListToggle
          },
          setPlayLis(state) {
              return state.playList
          },
        songId (state) {
            return state.songId
        }
      })  
    },
    watch: {
        playListToggle() {
            setTimeout(() => {
                this.items = this.setPlayLis
                this.$refs.scroll.refresh()
            }, 25)
        }
    },
    components: {
        scroll
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
    padding: 0 15px;
    .list{
        line-height: 35px;
        font-size: 14px;
        @include border-1px($day-border);
        font-size: 14px;
        color:$day-color;
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
@keyframes opacitys{
    0%{
        opacity: 0;
    }
    100%{
        opacity: .6;
    }
}
</style>
