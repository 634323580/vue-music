<template>
    <div class="songController">
        <div class="song-type"><i class="iconfont">&#xe625;</i></div>
        <div class="song-controller">
            <div class="song-prev">
                <i class="iconfont">&#xe609;</i>
            </div>
            <div class="song-play" @click="playGo()">
                <i class="iconfont" v-if="!play">&#xe606;</i>
                <i class="iconfont" v-if="play">&#xe60b;</i>
            </div>
            <div class="song-next">
                <i class="iconfont">&#xe60a;</i>
            </div>
        </div>
        <div class="song-list-icon"><i class="iconfont">&#xe625;</i></div>
    </div>
</template>
<script>
// import Bus from '../../common/js/bus'
// import { mapState } from 'vuex'
export default {
    props: {
        play: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        playGo() {
            this.$store.commit('setPlayState', { state: !this.$store.state.playState })
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
        margin:0 10px;
    }
    .song-play{
        .iconfont{
            font-size: 35px;
        }
    }
}
</style>
