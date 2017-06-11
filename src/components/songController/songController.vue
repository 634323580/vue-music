<template>
    <div class="songController">
        <div class="song-type" @click="changeMode()">
            <!--<i class="iconfont">&#xe625;</i>-->
                <i class="iconfont" v-if="this.currentMode === 0" style="margin-top:4px;display:inline-block">&#xe67a;</i>
                <i class="iconfont" v-if="this.currentMode === 1">&#xe628;</i>
                <i class="iconfont" v-if="this.currentMode === 2">&#xe78a;</i>
        </div>
        <div class="song-controller">
            <div class="song-prev" @click="songChange(-1)">
                <i class="iconfont">&#xe609;</i>
            </div>
            <div class="song-play" @click="playGo()">
                <i class="iconfont" v-if="!play">&#xe606;</i>
                <i class="iconfont" v-if="play">&#xe60b;</i>
            </div>
            <div class="song-next" @click="songChange(1)">
                <i class="iconfont">&#xe60a;</i>
            </div>
        </div>
        <div class="song-list-icon" @click='playList()'><i class="iconfont">&#xe625;</i></div>
    </div>
</template>
<script>
// import Bus from '../../common/js/bus'
// import { mapState } from 'vuex'
import utils from '../../common/js/utils'
export default {
    props: {
        play: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            clearTime: 0,
            currentMode: utils.getStorage('currentMode', 0)
        }
    },
    created () {
        this.$store.commit('setPlayMode', this.currentMode)
    },
    methods: {
        playGo() {
            this.$store.commit('setPlayState', { state: !this.$store.state.playState })
        },
        playList() {
            this.$store.commit('playListToggle', true)
        },
        // 上一首下一首
        songChange(type = 1) {
            // clearTimeout(this.clearTime)
            // this.clearTime = setTimeout(() => {
            //     let playList = this.$store.state.playList
            //     let index = parseInt(localStorage.songIndex)
            //     switch (type) {
            //         case 1:
            //         index = index + 1
            //         console.log(index)
            //         if (index >= playList.length) {
            //             index = 0
            //         }
            //         break
            //         case -1:
            //         index = !index ? playList.length - 1 : index - 1
            //         break
            //     }
            //     utils.getSong(this.$store.state.playList[index])
            // }, 200)
            utils.songChange(type)
        },
        // 切换播放模式
        changeMode() {
            if (this.currentMode === 2) {
                this.currentMode = 0
            } else {
                this.currentMode = this.currentMode + 1
            }
            localStorage.currentMode = this.currentMode
            this.$store.commit('setPlayMode', this.currentMode)
            return this.currentMode
        }
    }
}
</script>
<style lang="scss" scoped>
.songController{
    display: flex;
    justify-content: space-between;
    align-items: center;
    i.iconfont{
        font-size: 25px;
    }
}
.song-controller{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &>div{
        margin:0 15px;
    }
    .song-play{
        .iconfont{
            font-size: 40px;
        }
    }
}
</style>
