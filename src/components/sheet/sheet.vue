<template>
    <div class="sheet">
        <dl class="sheet-item" v-for="sheetItem in sheet">
            <dt class="sheet-title" @click="eventShow(sheetItem)">
                <i :class="{on: sheetItem.show}" class="iconfont">&#xe626;</i>
                {{sheetItem.title}}<span>({{sheetItem.length}})</span>
            </dt>
            <dd class="item-content" v-show="sheetItem.show">
                <div class="item" v-for="item in sheetItem.items">
                    <span class="img">
                        <img :src="item.pic_small ? item.pic_small : item.pic_big" alt="" width="52" height="52">
                    </span>
                    <div class="item-text">
                        <h3 class="item-title">{{item.title}}</h3>
                        <p>专辑：{{item.album_title}}</p>
                    </div>
                </div>
        
            </dd>
        </dl>
    </div>
</template>
<script>
import Server from '../../server'
export default {
  name: 'sheet',
  data () {
    return {
        sheet: {
            'love': {
                show: false,
                title: '周杰伦',
                length: '',
                items: []
            },
            'keyi': {
                show: false,
                title: '我收藏的音乐'
            }
        }
    }
  },
  created () {
    let option = {
            tinguid: '7994',
            // limits: '6',
            use_cluster: '1',
            order: '2'
        }
    Server.getSongList(option)
    .then(res => {
        this.sheet.love.items = res.body.songlist
        this.sheet.love.length = this.sheet.love.items.length
        setTimeout(() => { this.$emit('scroll') })
    }, err => {
        console.log(err)
    })
  },
  methods: {
     eventShow (sheetItem) {
        sheetItem.show = !sheetItem.show
        setTimeout(() => { this.$emit('resetScroll') })
     }
  }
}
</script>
<style lang="scss" scoped>
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
                /*transition:.3s ease;*/
                &.on{
                    transform:rotate(-180deg);
                    position:relative;
                    top: -3px;
                }
            }
        }
        .item-content{
            margin:0;
        }
        .item{
            margin:5px 0;
            @extend %padding;
            display:flex;
            height: 57px;
            .img{
                img{
                    vertical-align: middle;
                }
            }
            .item-text{
                flex:1;
                margin-left: 10px;
                border-bottom: 1px solid $day-border;
                .item-title{
                    font-weight: normal;
                    color:#222;
                    margin-top: 5px;
                }
                p{
                    color:#717170;
                    font-size: 12px;
                }
            }
        }
    }
</style>
