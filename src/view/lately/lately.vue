<template>
        <div class="lately-wrapper">
            <div class="lately-head">
                <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
                <div class="text">最近播放</div>
            </div>
            <scroll :data='items'>
                <div class="lately-content">
                    <songlist :songs="items"></songlist>
                </div>
            </scroll>
        </div>
</template>
<script>
import scroll from '@/components/scroll/scroll'
import songlist from '@/components/songList/songList'
// import Bus from '@/common/js/bus'
import utils from '@/common/js/utils'
export default {
    data() {
        return {
            items: []
        }
    },
    created () {
      this.items = utils.lately()
    },
    activated () {
      this.items = utils.lately()
    },
    methods: {
        prev() {
            utils.prev()
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
.homeView-enter-active, .homeView-leave-active {
  transition: all .3s
}
.homeView-enter, .homeView-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}

</style>
