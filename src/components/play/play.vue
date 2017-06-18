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
    import utils from '../../common/js/utils'
    export default {
        name: 'play',
        data () {
            return {
                file_link: './static/res/xpg/小苹果.mp3',
                audio: ''
            }
        },
        created() {
            // this.$nextTick(() => {
            //     this.audio = document.getElementById('audio')
            //     this.audio.load()
            // })
        },
        mounted () {
            this.$nextTick(() => {
                this.audio = document.getElementById('audio')
                this.audio.load()
                // 播放速度
                // this.audio.playbackRate = 20
                // 监听播放结束
                this.audio.addEventListener('ended', () => {  
                    // this.$store.commit('setPlayState', { state: false })
                    // this.$store.commit('setCurrentTime', 0)
                    // 0为列表循环， 1为随机播放， 2为单曲循环，切换歌曲会自动判断是否随机播放
                    switch (parseInt(localStorage.currentMode)) {
                        case 0: 
                        utils.songChange(1)
                        break
                        case 1:
                        utils.songChange()
                        break
                        case 2:
                        this.audio.currentTime = 0
                        this.audio.play()
                    }
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
                    // this.$store.commit('setPlayState', { state: true })
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
                setTimeout(() => {
                    // 恶心的ios需要load一下
                    this.audio.load()
                }, 20)
            },
            playState(playState, oldVal) {
                if (this.audio.readyState === 0) {
                    return
                }
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
