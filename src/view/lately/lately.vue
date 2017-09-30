<template>
    <transition name="homeView">
        <div class="lately-wrapper">
            <prevheader title='最近播放'></prevheader>
            <scroll :data='items'>
                <div class="lately-content">
                    <songlist :songs="items" v-if="items.length"></songlist>
                    <p style="padding:20px;" v-else>暂时没有播放记录</p>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script>
import scroll from '@/components/scroll/scroll'
import songlist from '@/components/songList/songList'
import prevheader from '@/components/prevheader/prevheader'
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
    components: {
        scroll,
        songlist,
        prevheader
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
    overflow: hidden;
    // display: none;
}
// .lately-head{
//     position: fixed;
//     top: 0;
//     right: 0;
//     left: 0;
//     z-index: 10;
//     height:55px;
//     display: flex;
//     background: $dayTheme;
//     @extend %padding;
//     align-items: center;
//     .prev-btn{
//         flex: 0 0 50px;
//         i{
//             color: #fff;
//             font-size: 28px;
//             margin-left: 7px;
//         }
//     }
//     .text{
//         color: #fff
//     }
// }
.homeView-enter-active, .homeView-leave-active {
  transition: all .3s
}
.homeView-enter, .homeView-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}

</style>
