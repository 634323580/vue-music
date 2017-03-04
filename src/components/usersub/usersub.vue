<template>
    <div class="usersuv">
        <div class="usersuv-list" v-for="item in items">
            <i class="iconfont" v-html="item.icon"></i>
            <div class="content">
                <h3 class="list-title">{{item.text}}</h3>
                <span class="number">({{item.number}})</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'usersub',
  data () {
    return {
        items: [
                {
                    text: '最近播放',
                    number: '100',
                    icon: '&#xe612;'
                },
               {
                    text: '下载管理',
                    number: '6',
                    icon: '&#xe6a5;'
                },
                {
                    text: '我的歌手',
                    number: '2',
                    icon: '&#xe619;'
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
.usersuv{
    /*@extend %pt55;*/
    .usersuv-list{
        display: flex;
        align-items: center;
        .iconfont{
            font-size: 25px;
            color:$dayTheme;
            @extend %padding;
            display:block;
        }
        .content{
            display: flex;
            align-items: center;
            line-height:55px;
            border-bottom: 1px solid $day-border;
            flex:1;
            .list-title{
                font-size: 15px;
                font-weight: 200;
            }
            .number{
                font-size: 12px;
                color:#888787;
                margin-left: 5px;
            }
        }
    }
}
</style>
