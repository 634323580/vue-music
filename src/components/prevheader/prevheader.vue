<template>
    <div class="prev-head" :class="opacity">
        <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
        <div class="text">{{title}}</div>
    </div>
</template>
<script>
import utils from '@/common/js/utils'
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        styleOpacity: {
            type: String,
            default: 'default'
        }
    },
    methods: {
        prev() {
            utils.prev()
        }
    },
    computed: {
        opacity() {
            return 'head' + this.styleOpacity
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.prev-head{
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
    &.headOpacity{
        background: transparent;
        box-shadow: none !important;
    }
}
</style>
