<template>
    <div class="sheet">
        <dl class="sheet-item" v-for="sheetItem in sheet">
            <dt class="sheet-title" @click="eventShow(sheetItem)">
                <i :class="{on: sheetItem.show}" class="iconfont">&#xe626;</i>
                {{sheetItem.title}}<span>({{sheetItem.length}})</span>
            </dt>
            <dd class="item-content" v-show="sheetItem.show">
                    <songlist :songs="sheetItem.items"></songlist>
                <!--<div class="item" v-for="item in sheetItem.items" @click="fileLink(item.song_id)">
                    <span class="img">
                        <img :src="item.pic_small ? item.pic_small : item.pic_big" alt="" width="52" height="52">
                    </span>
                    <div class="item-text .border-1px">
                        <h3 class="item-title">{{item.title}}</h3>
                        <p>专辑：{{item.album_title}}</p>
                    </div>
                </div>-->
                <loading v-show="sheetItem.loading"></loading>
            </dd>
        </dl>
    </div>
</template>
<script>
import serve from '../../serve'
import Bus from '@/common/js/bus.js'
import loading from '../loading/loading'
import songlist from '../songList/songList'
// import { mapMutations } from 'vuex'
export default {
  name: 'sheet',
  data () {
    return {
        sheet: {
            'love': {
                show: true,
                title: '周杰伦',
                length: '',
                loading: true,
                items: []
            },
            'keyi': {
                show: false,
                title: '我喜欢的音乐',
                loading: true,
                items: [{}, {}, {}]
            }
        }
    }
  },
  created () {
    let option = {
            method: 'baidu.ting.artist.getSongList',
            tinguid: '7994',
            // limits: '10',
            // offset: '0',
            use_cluster: '1',
            order: '2'
        }
    serve.get(option)
    .then(res => {
        setTimeout(() => {
            this.sheet.love.items = res.body.songlist
            this.sheet.love.length = res.body.songnums
            this.sheet.love.loading = false
            Bus.$emit('resetScroll')
        }, 0)
    })
  },
  methods: {
     eventShow (sheetItem) {
        sheetItem.show = !sheetItem.show
        Bus.$emit('resetScroll')
     }
  },
  components: {
      loading,
      songlist
  }
}
</script>
<style lang="scss" scoped>
    @import '../../common/scss/mixin';
    @import '../../common/scss/var.scss';
    .sheet{
    }
    .sheet-item{
        margin:0;
        .sheet-title{
            display: flex;
            align-items: center;
            line-height: 35px;
            background-color:$title-bg;
            @extend %padding;
            color:$title-color;
            &>span{
                font-size: 12px;
                display: inline-block;
                margin-left: 5px;
            }
            .iconfont{
                margin-right: 5px;
                transition:.2s ease;
                transform:rotate(-90deg);
                &.on{
                    transform:rotate(-180deg);
                    // position:relative;
                    // top: -3px;
                }
            }
        }
        .item-content{
            margin:0;
        }
        // .item{
        //     margin:5px 0;
        //     @extend %padding;
        //     display:flex;
        //     height: 57px;
        //     .img{
        //         img{
        //             vertical-align: middle;
        //         }
        //     }
        //     .item-text{
        //         flex:1;
        //         margin-left: 10px;
        //         /*border-bottom: 1px solid $day-border;*/
        //         @include border-1px($day-border);
        //         .item-title{
        //             font-weight: normal;
        //             color:#222;
        //             margin-top: 5px;
        //         }
        //         p{
        //             color:#717170;
        //             font-size: 12px;
        //         }
        //     }
        // }
    }
</style>
