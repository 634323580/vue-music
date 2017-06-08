<template>
    <transition name="lately">
        <div class="lately-wrapper" v-show="toggle">
            <div class="lately-head">
                <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
                <div class="text">最近播放</div>
            </div>
            <scroll :data='items'>
                <ul class="lately-content">
                    <li class="lately-list" v-for="song in items">
                        <songlist :songs="song"></songlist>
                    </li>
                </ul>
            </scroll>
        </div>
    </transition>
</template>
<script>
import scroll from '../scroll/scroll'
import songlist from '../songList/songList'
import Bus from '@/common/js/bus'
import utils from '../../common/js/utils'
export default {
    data() {
        return {
            items: [],
            toggle: false
        }
    },
    created () {
            Bus.$on('latelyShow', () => {
                this.toggle = true
                this.items = utils.lately()
            })
    },
    methods: {
        prev() {
            this.toggle = false
            this.items = []
        }
    },
    components: {
        scroll,
        songlist
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.lately-content{
    padding: 55px 0 45px;
}
.lately-wrapper{
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: $dayBg;
    // display: none;
}
.lately-head{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    height:55px;
    display: flex;
    background: $dayTheme;
    @extend %padding;
    align-items: center;
    .prev-btn{
        flex: 0 0 50px;
        i{
            color: #fff;
            font-size: 28px;
            margin-left: 7px;
        }
    }
    .text{
        color: #fff
    }
}
.lately-enter-active, .lately-leave-active {
  transition: all .3s
}
.lately-enter, .lately-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}
</style>
