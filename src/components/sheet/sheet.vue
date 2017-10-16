<template>
    <div class="sheet">
        <dl class="sheet-item" v-for="sheetItem in sheet">
            <dt class="sheet-title" @click="eventShow(sheetItem)">
                <i :class="{on: sheetItem.show}" class="iconfont">&#xe626;</i>
                {{sheetItem.title}}<span>({{sheetItem.length}})</span>
            </dt>
            <dd class="item-content" v-show="sheetItem.show">
                    <songlist v-if="sheetItem.items.length" :songs="sheetItem.items"></songlist>
                    <p v-else  v-show="!sheetItem.loading" style="font-size:13px;line-height:35px;padding:0 15px;">还没有喜欢的歌手或歌曲，赶紧去收藏吧！</p>
                <!--<div class="item" v-for="item in sheetItem.items" @click="fileLink(item.song_id)">
                    <span class="img">
                        <img :src="item.pic_small ? item.pic_small : item.pic_big" alt="" width="52" height="52">
                    </span>
                    <div class="item-text .border-1px">
                        <h3 class="item-title">{{item.title}}</h3>
                        <p>专辑：{{item.album_title}}</p>
                    </div>
                </div>-->
                <loading v-if="sheetItem.loading"></loading>
            </dd>
        </dl>
    </div>
</template>
<script>
import serve from '../../serve'
import loading from '../loading/loading'
import songlist from '../songList/songList'
import utils from '../../common/js/utils'
import { mapState } from 'vuex'
export default {
  name: 'sheet',
  props: {
      scroll: ''
  },
  data () {
    return {
        sheet: {
            'love': {
                show: true,
                title: '猜你喜欢',
                length: '',
                loading: true,
                items: []
            },
            'loveSong': {
                show: false,
                title: '我喜欢的音乐',
                length: '',
                loading: false,
                items: []
            }
        }
    }
  },
  created () {
    let lately = localStorage.loveList && JSON.parse(localStorage.loveList)
    let songId
    if (lately && lately.length) {
        songId = lately[Math.floor(Math.random() * lately.length)].song_id
    } else {
        songId = 7994
    }
    this.$store.commit('setLoveList', utils.getStorage('loveList'))
    // baidu.ting.song.getRecommandSongList&song_id=877578&num=5
    let option = {
            method: 'baidu.ting.song.getRecommandSongList',
            song_id: songId,
            num: 100
        }
    serve.get(option)
    .then(res => {
        this.sheet.love.items = res.body.result.list
        this.sheet.love.length = res.body.result.list.length
        this.sheet.love.loading = false
        setTimeout(() => {
            this.scroll.refresh()
        }, 20)
    })
  },
  methods: {
     eventShow (sheetItem) {
        sheetItem.show = !sheetItem.show
        setTimeout(() => {
            this.scroll.refresh()
        }, 20)
     }
  },
  computed: {
    ...mapState({
        loveList(state) {
            return state.loveList
        }
    })  
  },
  watch: {
      loveList(loveList) {
            this.sheet.loveSong.items = loveList
            this.sheet.loveSong.length = loveList.length
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
