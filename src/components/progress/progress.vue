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
            // 手指按下屏幕
            this.barWrapper.addEventListener('touchstart', (e) => {
                this.__touchBar(e)
                this.progressLength = false
            })
            // 手指移动
            this.barWrapper.addEventListener('touchmove', (e) => {
                e.preventDefault()
                this.__touchBar(e)
            })
            // 手机离开屏幕
            this.barWrapper.addEventListener('touchend', (e) => {
                this.audio.currentTime = this.timeupdate
                setTimeout(() => {
                    this.progressLength = true
                }, 100)
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
    border-radius: 3px;
    position: relative;
    &:after{
        content: '';
        display: block;
        position: absolute;
        left: -10px;
        bottom: -10px;
        right: -10px;
        top: -10px;
    }
    .bar{
        height: 100%;
        border-radius: 3px;
        background: $dayTheme;
        width: 0;
        position: relative;
        &:after{
            content: '';
            display: block;
            position: absolute;
            width: 12px;
            height: 12px;
            right: 0;
            top: 50%;
            margin:-6px -6px 0 0 ;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 10px rgba(0,0,5px,.3);
        }
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
