<template>
    <div class="usersuv">
        <div class="usersuv-list" @click="latelyShow()">
            <i class="iconfont">&#xe612</i>
            <router-link class="content border-1px" tag="div" :to="{path: '/lately'}">
                <h3 class="list-title">最近播放</h3>
                <span class="number">({{latelyLength ? latelyLength : 0}})</span>
            </router-link>
        </div>
        <div class="usersuv-list">
            <i class="iconfont">&#xe6a5</i>
            <div class="content border-1px">
                <h3 class="list-title">下载管理</h3>
                <span class="number">(6)</span>
            </div>
        </div>
        <div class="usersuv-list">
            <i class="iconfont">&#xe619</i>
            <div class="content border-1px">
                <h3 class="list-title">我的歌手</h3>
                <span class="number">(2)</span>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '@/common/js/bus'
import { mapState } from 'vuex'
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
  methods: {
      latelyShow() {
        Bus.$emit('latelyShow')
      }
  },
  computed: {
      ...mapState({
          latelyLength(state) {
              return state.latelyLength
          }
      })
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/mixin';
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
            @include border-1px($day-border);
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
