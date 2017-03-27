<template>
    <div class="play-wrapper">
        <!-- 播放地址 -->
        <!--autoplay-->
        <audio ref="audio" id="audio" :src="song.file_link"></audio>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'play',
        data () {
            return {
                file_link: '/static/res/xpg/小苹果.mp3',
                audio: ''
            }
        },
        created() {
        },
        mounted () {
            this.audio = document.getElementById('audio')
            this.audio.addEventListener('ended', () => {  
                this.$store.commit('setPlayState', { state: true })
            }, false)
            this.audio.addEventListener('playing', () => {
                 this.$store.commit('setPlayState', { state: false })
                setInterval(() => {
                    this.$store.commit('setCurrentTime', this.audio.currentTime)
                }, 1000)
            }, false)
            this.audio.addEventListener('pause', () => {
                 this.$store.commit('setPlayState', { state: true })
            }, false)
        },
        computed: {
            ...mapState({
                song (state) {
                    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                    // 提交更新状态
                    // this.$store.commit('increment')
                    return state.song
                }
            })
        },
        watch: {
            song: function (song, oldVal) {
                console.log(song)
                // 这里获取到播放链接
                 setTimeout(() => {
                     document.getElementById('audio').play()
                 })
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
