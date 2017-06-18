<template>
  <transition name="top">
  <div class="toplist-page">
      <prevheader :title='title'></prevheader>
      <div class="load" v-show="load"><loading></loading></div>
      <scroll :data='toplist' :pullup='pullup' @scrollToEnd='loadmore()' v-show="!load">
        <ul class="list-content">
          <li v-for="(list, index) in toplist" class="list" @click="fileLink(list, 1, toplist)">
            <div class="rank">
              <span v-if="index <= 2" :class='{icon: true, icon1: index===0, icon2: index===1, icon3: index===2}'></span>
              <span v-else class="text">{{index + 1}}</span>
            </div>
            <div class="content">
              <h2 class="name">{{list.title}}</h2> 
              <p class="desc">{{list.artist_name}}-{{list.country}}</p>
            </div>
          </li>
          
          <li v-if="!noneData"><loading></loading></li>
          <li v-else style="text-align:center;margin-top:20px;font-size:13px;">没有更多数据</li>
        </ul>
      </scroll>
  </div>
  </transition>
</template>

<script>
  import loading from '../components/loading/loading'
  import scroll from '../components/scroll/scroll'
  import serve from '../serve'
  import utils from '../common/js/utils'
  import prevheader from '@/components/prevheader/prevheader'
  export default {
    data () {
      return {
        title: '排行榜',
        toplist: [],
        load: true,
        pullup: true,
        noneData: false
      }
    },
    created () {
      switch (parseInt(this.$route.params.type)) {
        case 1:
        this.title = '新歌榜'
        break
        case 2:
        this.title = '热歌榜'
        break
        case 11:
        this.title = '摇滚榜'
        break
        case 12:
        this.title = '爵士'
        break
        case 16:
        this.title = '流行'
        break
        case 21:
        this.title = '欧美金曲榜'
        break
        case 22:
        this.title = '经典老歌榜'
        break
        case 23:
        this.title = '情歌对唱榜'
        break
        case 24:
        this.title = '影视金曲榜'
        break
        case 25:
        this.title = '网络歌曲榜'
        break
        default:
        utils.prev()
      }
      setTimeout(() => {
        this.getData(50)
        .then(res => {
          this.load = false
          this.toplist = res.body.song_list
        })
      }, 300)
    },
    methods: {
      getData(num = 20, offset = this.toplist.length) {
        let option = {
            method: 'baidu.ting.billboard.billList',
            type: this.$route.params.type,
            size: num,
            offset: offset
        }
        return serve.get(option)
      },
      fileLink(id, type, data) {
          utils.getSong(id, type, data)
      },
      loadmore() {
        if (this.pullup) {
          this.pullup = false
          this.getData()
          .then((res) => {
            if (!res.body.song_list || !res.body.song_list.length) {
              this.noneData = true
              return
            }
            this.toplist = this.toplist.concat(res.body.song_list)
            this.pullup = true
          })
        }
      }
    },
    components: {
      prevheader,
      scroll,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../common/scss/var';
.toplist-page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $dayBg;
  z-index: 10;
  padding: 0 15px;
}
.list-content{
  padding: 55px 0;
  .list{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
  }
  .rank{
    flex: 0 0 25px;
    width: 25px;
    margin-right: 30px;
    text-align: center;
    color: $dayTheme;
    font-size: 18px;
    .icon{
      display: block;
      height: 24px;
      background-size: 25px 24px;
    }
    .icon1{
      background-image: url(data:image/png;base64,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)
    }
    .icon2{
      background-image: url(data:image/png;base64,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)
    }
    .icon3{
      background-image: url(data:image/png;base64,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)
    }
  }
  .content{
    flex: 1;
    line-height: 20px;
    overflow: hidden;
  }
  .name{
    color: $day-color;
    font-size: 14px;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .desc{
    font-size: 13px;
    margin-top: 3px;
    color: #999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.load{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.top-enter-active, .top-leave-active {
  transition: all .3s
}
.top-enter, .top-leave-active {
  transform: translate3d(100%,0,0);
}
</style>
