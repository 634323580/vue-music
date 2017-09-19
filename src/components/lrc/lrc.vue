<template>
    <transition name="opacity">
        <div class="lrc-content" v-show="show">
            <scroll ref="scrolls" :data='lrc'>
                <ul class="lrc-wrapper">
                    <li v-for="(value, key, index) of lrc" :class="{active: currentTime === parseInt(key)}" :key="key">{{value}}</li>
                    <li v-if="!Object.keys(lrc).length">歌词加载中</li>
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
            // if (-this.offset <= this.$refs.scrolls.scroll.maxScrollY && this.$refs.scrolls.scroll.y <= this.$refs.scrolls.scroll.maxScrollY) {
            //     return
            // }
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
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    left: 0;
    text-align: center;
    line-height: 30px;
    li{
        height: 30px;
        opacity: .6;
        transition: .3s ease;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.active{
            opacity: 1;
            font-size: 16px;
        }
    }
}
</style>
