<template>
    <transition name="controller">
        <div class="play-controller" v-if="song.title" @click='songShow()'>
            <div class="song_info">
                <div class="song_cover" :class="{rotatePlay: true, rotatePaused: !playState}">
                    <img width="35" height="35" :src='song.pic_small ? song.pic_small : " /static/res/ccnn/0e2442a7d933c8953ee45510d21373f0830200c7.jpg"' alt="">
                </div>
                <div class="song_text">
                    <h3 class="song-title">{{song.title}}</h3>
                    <p class="singer-name">{{song.author}}</p>
                </div>
            </div>
            <div class="play-controller-btn">
                <div class="play-btn" @click.stop="playGo()">
                    <svg class="pie" :class="{play: playState}" width="30" height="30" viewbox="0 0 30 30">
                        <circle class="circle-1" cx="15" cy="15" r="13" stroke-width="1" stroke="#D1D3D7" fill="none"></circle>
                        <circle ref="circle" class="circle-2" cx="15" cy="15" r="13" stroke-width="1" stroke="#00A5E0" fill="none" transform="matrix(0,-1,1,0,0,30)" :stroke-dasharray="progress"></circle>
                    </svg>
                    <i class="play-icon iconfont" :class="{playIcon: !playState}" v-html="playState ? '&#xe600;' : '&#xe624;'"></i>
                </div>
                <div @click.stop="playList()"class="play-list-btn iconfont">&#xe926;</div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { mapState } from 'vuex'
    // import Utils from '@/common/js/utils.js'
    export default {
        name: 'controller',
        props: {
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
        created() {
            if (localStorage.current_song) {
                let currentSong = JSON.parse(localStorage.current_song)
                this.$store.commit('setSong', currentSong)
                this.$store.commit('setSongId', currentSong.song_id)
            }
        },
        computed: {
            ...mapState({
                progress(state) {
                    // 播放进度实时重绘svg实现播放按钮外圈进度条
                    let percent = state.timePercentage / 100
                    let perimeter = Math.PI * 2 * 14
                    let dasharray = perimeter * percent + " " + perimeter * (1 - percent)
                    return dasharray
                }
            })
        },
        methods: {
            playGo () {
                let audio = document.getElementById('audio')
                if (audio.readyState === 0 && !this.$store.state.playState) {
                    return
                }
                // 控制当前播放状态
                this.$store.commit('setPlayState', { state: !this.$store.state.playState })
            },
            songShow() {
                this.$emit('songShow')
            },
            playList() {
                this.$store.commit('playListToggle', true)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/scss/var.scss';
    .play-controller{
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        height:45px;
        z-index: 11;
        background:#fff;
        display: flex;
        align-items: center;
        @extend %padding;
        overflow:hidden;
    }
    .song_info{
        flex:1;
        display: flex;
        align-items: center;
        flex-direction: row;
        .song_cover{
            flex: 0 0 35px;
            overflow: hidden;
            border-radius: 50%;
            img{
                display: block;
                border-radius: 50%;
            }
        }
        .song_text{
            padding-left: 7px;
            .song-title{
                font-size: 14px;
                font-weight:normal;
            }
            .singer-name{
                font-size:12px;
                color:#7e7e7e;
            }
        }
    }

.play-controller-btn{
    display: flex;
    align-items: center;
}
/* 播放按钮 */
.play-btn{
    width: 25px;
    height: 25px;
    position: relative;
    margin-right: 20px;
    font-size: 0;
    .iconfont{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-25%, -25%);
        color:$dayTheme;
        font-size: 12px;
        line-height: 1;
        margin: -1px 0 0 -1px;
        &.playIcon{
            color:#292929;
            margin:0;
        }
    }
}
.play-list-btn{
    font-size:30px;
    margin-top:7px;
}
.pie circle{
    transition: .3s ease;
}
.circle-1 {
    stroke: #292929;
}
.play .circle-1 {
    stroke: $dayTheme;
}
.pie .circle-2 {
    stroke: #ccc;
}
.controller-enter-active, .controller-leave-active {
  transition: all .3s
}
.controller-enter, .controller-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}

</style>
