<template>
    <div class="songController">
        <mode></mode>
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
        <div class="song-list-icon" @click="loveFn()">
            <i class="iconfont" :class="{love: love}" v-html="love ? '&#xe669;' : '&#xe66b;'"></i>
            <!-- <i v-if="love" class="iconfont love">&#xe669;</i> -->
        </div>
    </div>
</template>
<script>
import utils from '../../common/js/utils'
import mode from '@/components/mode/mode'
export default {
    props: {
        play: {
            type: Boolean,
            default: false
        },
        song: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data () {
        return {
            clearTime: 0,
            love: false
        }
    },
    methods: {
        playGo() {
            this.$store.commit('setPlayState', { state: !this.$store.state.playState })
        },
        // 上一首下一首
        songChange(type = 1) {
            utils.songChange(type)
        },
        loveFn() {
            let loveList = utils.getStorage('loveList')
            if (!this.love) {
                loveList.unshift(this.song)
                this.love = true
                this.$alert('添加到喜欢')
            } else {
                loveList.forEach((item, index) => {
                    if (item.song_id === this.song.song_id) {
                        this.love = false
                        loveList.splice(index, 1)
                        this.$alert('取消喜欢')
                    }
                })
            }
            this.$store.commit('setLoveList', loveList)
            localStorage.loveList = JSON.stringify(loveList)
        }
    },
    watch: {
        song(song) {
            let loveList = utils.getStorage('loveList')
            for (let i = 0; i < loveList.length; i++) {
                if (loveList[i].song_id === this.song.song_id) {
                    this.love = true
                    return
                } else {
                    this.love = false
                }
            }
        }
    },
    components: {
        mode
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
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
.love{
    color: $dayTheme;
}
</style>
