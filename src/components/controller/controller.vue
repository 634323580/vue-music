<template>
        <div class="play-controller" v-if="song.title">
            <div class="song_info">
                <div class="song_cover">
                    <img width="35" height="35" :src='song.pic_small ? song.pic_small : " /static/res/ccnn/0e2442a7d933c8953ee45510d21373f0830200c7.jpg"' alt="">
                </div>
                <div class="song_text">
                    <h3 class="song-title">{{song.title}}</h3>
                    <p class="singer-name">{{song.author}}</p>
                </div>
            </div>
            <div class="play-controller-btn">
                <div class="play-btn" @click="playGo()">
                    <div class="pie" :class="{play: !playState}">{{progress}}</div>
                    <div class="bg"></div>
                    <i class="play-icon iconfont" :class="{playIcon: playState}" v-html="playState ? '&#xe624;' : '&#xe600;'"></i>
                </div>
                <div class="play-list iconfont">&#xe926;</div>
            </div>
        </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Utils from '@/common/js/utils.js'
    export default {
        name: 'controller',
        created() {
            if (localStorage.current_song) {
                let currentSong = JSON.parse(localStorage.current_song)
                this.$store.commit('setSong', currentSong)
            }
        },
        mounted () {
            // 播放按钮
            // utils.playBtn('.pie')
        },
        computed: {
            ...mapState({
                playState(state) {
                    return state.playState
                },
                progress(state) {
                    // 播放进度实时重绘svg实现播放按钮外圈进度条
                    this.$nextTick(() => {
                        this.playBtn('.pie', state.timePercentage)
                    })
                    return state.timePercentage + '%'
                },
                song(state) {
                    return state.song
                }
            })
        },
        methods: {
            // 播放按钮圆形进度条
            playBtn(sekectClass, text) {
                    let p = text
                    let NS = "http://www.w3.org/2000/svg"
                    let svg = document.createElementNS(NS, "svg")
                    let circle = document.createElementNS(NS, "circle")
                    let title = document.createElementNS(NS, "title")
                    circle.setAttribute("r", 16)
                    circle.setAttribute("cx", 16)
                    circle.setAttribute("cy", 16)
                    circle.setAttribute("stroke-dasharray", p + " 100")
                    svg.setAttribute("viewBox", "0 0 32 32")
                    title.textContent = p
                    Utils.$$(sekectClass)[0].textContent = ''
                    svg.appendChild(title)
                    svg.appendChild(circle)
                    Utils.$$(sekectClass)[0].appendChild(svg)
            },
            playGo () {
                // 控制当前播放状态
                this.$store.commit('setPlayState', { state: !this.$store.state.playState })
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
            img{
                display: block;
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
    .iconfont{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%, -50%);
        color:$dayTheme;
        font-size: 12px;
        margin-left:1px;
        &.playIcon{
            margin-left:2px;
            margin-top:1px;
            color:#292929;
        }
    }
}
.play-list{
    // width: 20px;
    // height: 20px; 
    // background:url(./img/play-list-btn.png) no-repeat center / cover;
    font-size:30px;
    margin-top:7px;
}
.pie {
	width: 25px;
	height: 25px;
	display: inline-block;
	transform: rotate(-90deg);
    position:relative; 
    border:1px solid #292929;
	border-radius: 50%;
    transition:.2s ease;
    &.play{
        border-color: $dayTheme;
    }
}
.play circle {
    stroke: $dayTheme;
}
</style>
