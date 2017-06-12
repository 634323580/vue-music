<template>
    <transition name="opacity">
        <div class="lrc-content" v-show="show">
            <scroll ref="scrolls" :data='lrc'>
                <ul class="lrc-wrapper">
                    <li v-for="(value, key, index) of lrc" :class="{active: currentTime === parseInt(key)}">{{value}}</li>
                </ul>
            </scroll>
        </div>
    </transition>
</template>
<script>
import scroll from '../scroll/scroll'
export default {
    props: {
        lrc: {
            type: Object,
            default() {
                return {}
            }
        },
        offset: {
            type: Number,
            default: 0
        },
        currentTime: {
            type: Number,
            default: 0
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        offset() {
            // this.$refs.scrolls.refresh()
            this.$refs.scrolls.scrollTo(0, -this.offset, 500)
        },
        show(show) {
            if (show) {
                setTimeout(() => {
                    this.$refs.scrolls.refresh()
                }, 25)
            }
        }
    },
    components: {
        scroll
    }
}
</script>
<style lang='scss' scoped>
.lrc-content{
    position: absolute;
    z-index: 20;
    padding-top: 40%;
    padding-bottom: 40%;
    top: 25px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    line-height: 30px;
    // font-size: 13px;
    li{
        height: 30px;
        opacity: .6;
        transition: .3s ease;
        &.active{
            opacity: 1;
            font-size: 16px;
        }
    }
}
</style>
