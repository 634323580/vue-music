<template>
    <div class="play-wrapper">
        <!-- 播放地址 -->
        <!--autoplay-->
        <audio ref="audio" id="audio" :src="file_link"></audio>
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
            let audio = document.getElementById('audio')
            let clearSet
            // 监听播放结束
            audio.addEventListener('ended', () => {  
                clearInterval(clearSet)
                this.$store.commit('setPlayState', { state: true })
            }, false)
            // 播放开始
            audio.addEventListener('playing', () => {
                 this.$store.commit('setPlayState', { state: false })
                clearSet = setInterval(() => {
                    this.$store.commit('setCurrentTime', audio.currentTime)
                }, 1000)
            }, false)
            // 暂停播放
            audio.addEventListener('pause', () => {
                clearInterval(clearSet)
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
