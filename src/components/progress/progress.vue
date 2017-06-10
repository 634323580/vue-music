<template>
    <div class="progress-wrapper">
        <span class="timeupdate">{{timeupdate | secToTime}}</span>
        <div class="bar-wrapper">
            <div class="bar" :style='{width: `${progress}%`}'></div>
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
            time: ''
        }
    },
    created () {
        this.$nextTick(() => {
             Bus.$on('getDuration', (s) => {
                 this.time = s
             })
            Bus.$on('timeupdate', (s) => {
                this.timeupdate = s
            })
        })
    },
    computed: {
    ...mapState({
        progress(state) {
            return state.timePercentage
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
