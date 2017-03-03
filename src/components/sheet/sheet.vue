<template>
    <div class="sheet">
        <dl class="sheet-item" v-for="sheetItem in sheet">
            <dt class="sheet-title" @click="eventShow(sheetItem)"><i :class="{on: sheetItem.show}" class="iconfont">&#xe626;</i>歌单<span>(18)</span></dt>
            <dd class="item-content" v-show="sheetItem.show">
                <div class="item" v-for="item in sheetItem.items">
                    <span class="img"><img src="./images/sheet-img.jpg" alt="" width="52" height="52"></span>
                    <div class="item-text">
                        <h3 class="item-title">{{item.title}}</h3>
                        <p>{{item.number}}首</p>
                    </div>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
  name: 'sheet',
  data () {
    return {
        sheet: [
            {
                show: false,
                items: [
                    {
                       title: '依然范特西',
                       number: 10
                    },
                    {
                       title: '依然范特西',
                       number: 10
                    }
                ]
            }
        ]
    }
  },
  created () {
    this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=10&offset=0')
        .then(res => {
            console.log(res)
        })
  },
  methods: {
     eventShow (sheetItem) {
        sheetItem.show = !sheetItem.show
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
                transition:.3s ease;
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
                }
            }
        }
    }
</style>
