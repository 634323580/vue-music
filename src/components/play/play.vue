<template>
    <div class="play-wrapper">
        <!-- 播放地址 -->
        <!--autoplay-->
        <audio ref="audio" id="audio" :src="song.file_link"></audio>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Bus from '../../common/js/bus'
    export default {
        name: 'play',
        data () {
            return {
                file_link: './static/res/xpg/小苹果.mp3',
                audio: ''
            }
        },
        created() {
        },
        mounted () {
            this.$nextTick(() => {
                this.audio = document.getElementById('audio')
                // 监听播放结束
                this.audio.addEventListener('ended', () => {  
                    this.$store.commit('setPlayState', { state: false })
                    this.$store.commit('setCurrentTime', 0)
                }, false)
                // 播放时间改变  
                this.audio.addEventListener('timeupdate', () => {
                    this.$store.commit('setCurrentTime', {
                        duration: this.audio.duration, currentTime: this.audio.currentTime
                    })
                    // 在progress组件监听
                    Bus.$emit('timeupdate', this.audio.currentTime)
                }, false)
                this.audio.addEventListener('durationchange', () => {
                    Bus.$emit('getDuration', this.audio.duration)
                })
                // 监听是否能播放
                this.audio.addEventListener('canplay', () => {
                    console.log('可以播放')
                    // setTimeout(() => { Bus.$emit('getDuration', this.audio.duration) }, 200)
                    this.$store.state.playState && this.audio.play()
                    // 在progress组件监听
                }, false)
            })
        },
        computed: {
            ...mapState({
                song (state) {
                    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                    // 提交更新状态
                    // this.$store.commit('increment')
                    return state.song
                },
                playState (state) {
                    return state.playState
                }
            })
        },
        watch: {
            song: function (song, oldVal) {
                // console.log(song)
                // 这里获取到播放链接
                 
            },
            playState(playState, oldVal) {
                playState ? this.audio.play() : this.audio.pause()
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../common/scss/var.scss';
    #audio{
        width:0;
        height:0;
        overflow:hidden;
    }
</style>
