<template>
    <div class="header">
        <div class="menu-btn">
            <i class="iconfont">&#xe790;</i>
        </div>
        <ul class="header-nav">
            <router-link v-for="navList in nav" class="list iconfont" v-html="navList.icon" :to="{path: navList.path}" tag="li"></router-link>
        </ul>
        <div class="search-btn">
            <i class="iconfont">&#xe610;</i>
        </div>
    </div>
</template>
<script>
export default {
  name: 'header',
  data () {
    return {
        nav: [
            {
                path: '/123',
                icon: '&#xe611;'
            },
            {
                path: '/music',
                icon: '&#xe655;'
            }
        ]
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var.scss';
.header{
    position:fixed;
    top:0;
    left:0;
    right:0;
    line-height:55px;
    color:#f5f5f5;
    background-color:$dayTheme;
    @extend %padding;
    display: flex;
    justify-content: space-between;
    z-index:10;
    .header-nav{
        display:flex;
        flex:0 0 100px;
        text-align:center;
        .list{
            flex:1;
            color:#e3908f;
            &.on{
                color:#f5f5f5;
            }
        }
    }
    .iconfont{
        font-size:25px;
        display:block;
    }
}
</style>
