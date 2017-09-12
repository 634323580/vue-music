<template>
    <div class="progress-wrapper">
        <span class="timeupdate">{{timeupdate | secToTime}}</span>
        <div class="bar-wrapper" ref="barWrapper">
            <div class="bar" ref="bar" :style='{width: `${progress}%`}'></div>
        </div>
        <span class="time">{{time | secToTime}}</span>
    </div>
</template>
<script>
import Bus from '../../common/js/bus'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            timeupdate: '',
            time: '',
            progressLength: true
        }
    },
    created () {
        this.$nextTick(() => {
             Bus.$on('getDuration', (s) => {
                 this.time = parseInt(s)
             })
            Bus.$on('timeupdate', (s) => {
                this.progressLength && (this.timeupdate = parseInt(s))
            })
            this.audio = document.getElementById('audio')
            this.barWrapper = this.$refs.barWrapper
            this.bar = this.$refs.bar
            this.barWrapper.addEventListener('touchstart', (e) => {
                this.__touchBar(e)
                this.progressLength = false
            })
            this.barWrapper.addEventListener('touchmove', (e) => {
                e.preventDefault()
                this.__touchBar(e)
            })
            this.barWrapper.addEventListener('touchend', (e) => {
                this.audio.currentTime = this.timeupdate
                setTimeout(() => {
                    this.progressLength = true
                })
            })
        })
    },
    methods: {
        __touchBar(e) {
            !this.barOffsetLeft && (this.barOffsetLeft = this.barWrapper.offsetLeft)
            !this.barOffsetWidth && (this.barOffsetWidth = this.barWrapper.offsetWidth)
            let percentage = (e.touches[0].pageX - this.barOffsetLeft) / this.barOffsetWidth
            percentage = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage
            this.bar.style.width = percentage * 100 + '%'
            this.timeupdate = parseInt(this.audio.duration * percentage)
        }
    },
    computed: {
    ...mapState({
        progress(state) {
            if (this.progressLength) {
                return state.timePercentage
            }
        }
    })
}
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.progress-wrapper{
    display: flex;
    padding:0 15px;
    align-items: center;
    font-size: 13px;
}
.bar-wrapper{
    flex: 1;
    height: 3px;
    background: #e8e8e8;
    // margin:0 10px;
    border-radius: 3px;
    .bar{
        height: 100%;
        border-radius: 3px;
        background: $dayTheme;
        width: 0;
    }
}
.timeupdate,.time{
    width: 45px;
}
.timeupdate{
    text-align: left;
}
.time{
    text-align: right;
}
</style>
