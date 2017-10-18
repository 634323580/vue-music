<template>
  <transition name="homeView">
    <div class="artist" v-if="artist">
        <prevheader :title='artist.name' styleOpacity="Opacity"></prevheader>
        <div class="prev-headerBg" ref="headerBg"></div>
        <div class="avatar"  ref="avatar">
          <img :src="artist.avatar.big" alt="">
        </div>
        <ul class="title-nav title-nav-fixed" v-show="!nav">
          <li class="list" :class="{on: type === hto}" @click="switchTab(hto)">热门50</li>
          <li class="list" :class="{on: type === singerInfo}" @click="switchTab(singerInfo)">歌手信息</li>
          <li class="list" :class="{on: type === album}" @click="switchTab(album)">专辑</li>
        </ul>
        <div class="bg">
          <scroll ref="scroll" :probeType="probeType" :listenScroll="true" @scroll="__scroll">
            <div class="artils-content">
              <div class="operation" ref="operation">
                <span class="item">收藏</span>
              </div>
              <ul class="title-nav">
                <li class="list" :class="{on: type === hto}" @click="switchTab(hto)">热门50</li>
                <li class="list" :class="{on: type === singerInfo}" @click="switchTab(singerInfo)">歌手信息</li>
                <li class="list" :class="{on: type === album}" @click="switchTab(album)">专辑</li>
              </ul>
              <ul v-show="type === 1" class="notSong search-content">
                  <songList :styles="3" :songs="notSong"></songList>
                  <li v-show="!notSong.length">
                    <loading></loading>
                  </li>
              </ul>
              <dl class="avatarDetail" v-show="type === 2">
                <dt>歌手简介</dt>
                <dd v-if="avatarDetail">
                  <p v-for="(item, index) in avatarDetail" :key="index">{{item}}</p>
                </dd>
                <dd>
                  <loading v-show="!avatarDetail"></loading>
                </dd>
              </dl>
            </div>
          </scroll>
        </div>
    </div>
  </transition>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import serve from '../serve'
import prevheader from '@/components/prevheader/prevheader'
import Loading from '@/components/loading/loading'
import songList from '@/components/songList/songList'
export default {
  data() {
      return {
        // 歌手
        artist: null,
        // 默认显示热门50
        type: 1,
        // 热门50
        hto: 1,
        // 歌手信息
        singerInfo: 2,
        // 专辑
        album: 3,
        // scroll滚动不断流
        probeType: 3,
        // 控制固定导航显示
        nav: true,
        // 热门50
        notSong: [],
        // 歌手信息
        avatarDetail: null
      }
  },
  activated() {
    // 没有传歌手信息就跳首页
    if (!this.$route.params.artist) {
      this.$router.push({path: '/'})
      return
    }
    // 获取歌手id信息
    this.artist = this.$route.params.artist
    setTimeout(() => {
      this.avatar = this.$refs.avatar
      this.scroll = this.$refs.scroll
    }, 20)
    // 默认显示热门50
    this.switchTab(this.type)
  },
  // 离开页面
  // beforeRouteLeave(to, from, next) {
  //   this.clear()
  //   next()
  // },
  deactivated () {
    this.$destroy()
  },
  methods: {
    // 页面滚动
    __scroll(pos) {
      let scale = 1
      if (pos.y > 1) {
        scale += (pos.y - 1) / 200
        this.avatar.style.WebkitTransform = `scale(${scale < 1 ? 1 : scale}) translate3d(0, ${(pos.y - 1) / 4}px, 0)`
        this.$refs.headerBg.style.opacity = 0
      } else {
        this.avatar.style.WebkitTransform = `scale(${1}) translate3d(0, ${pos.y > -80 ? pos.y : -80}px, 0)`
        let headerBg = pos.y / -320
        this.$refs.headerBg.style.opacity = headerBg > 0.5 ? 0.5 : headerBg.toFixed(2)
        let operation = 160 + pos.y
        this.$refs.operation.style.opacity = operation / 100 > 1 ? 1 : operation / 100 < 0 ? 0 : operation / 100
        if (pos.y <= -160) {
          this.nav = false
        } else {
          this.nav = true
        }
      }
    },
    // 重置
    clear() {
      if (!this.avatar) {
        return
      }
      this.notSong = []
      this.avatarDetail = null
      this.nav = true
      this.avatar.style.WebkitTransform = ''
      this.$refs.headerBg.style.opacity = 0
    },
    // 热门歌曲
    artistSong(id) {
      let option = {
              method: 'baidu.ting.artist.getSongList',
              tinguid: id,
              use_cluster: '1',
              order: '2'
          }
      serve.get(option)
        .then(res => {
          this.notSong = res.data.songlist
          setTimeout(() => {
            this.scroll.refresh()
          }, 20)
        })
    },
    // 歌手详情
    getAvatarDetail(id) {
        let option = {
                method: 'baidu.ting.artist.getinfo',
                tinguid: id
            }
      serve.get(option)
        .then(res => {
          // console.log(res.data.intro)
          this.avatarDetail = res.data.intro.split('\n')
          setTimeout(() => {
            this.scroll.refresh()
          }, 20)
        })
    },
    // 切换tab
    switchTab(type) {
      this.type = type
      switch (type) {
        case 1:
        if (!this.notSong.length) {
          this.artistSong(this.artist.ting_uid)
        }
        break
        case 2:
        if (!this.avatarDetail) {
          this.getAvatarDetail(this.artist.ting_uid)
        }
        break
        case 3:
      }
      if (this.scroll) {
        setTimeout(() => {
          // this.scroll.scrollTo(0, 0, 1)
          this.scroll.refresh()
        })
      }
    }
  },
  components: {
    Scroll,
    prevheader,
    Loading,
    songList
  }
}
</script>
<style lang="scss" scoped>
  @import '../common/scss/var';
.artist {
  height: 100%;
  position: relative;
  padding-top: 1px;
  z-index: 11;
  // @extend %padding;
  .artils-content{
    background: $dayBg;
    min-height: 100%;
    padding-bottom: 260px;
  }
  .avatar{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    img{
      width: 100%;
    }
  }
}
.bg{
  position: relative;
  z-index: 3;
  height: 100%;
  padding-top: 160px;
  margin-top: 55px;
  overflow: hidden;
}
.title-nav{
    display: flex;
    background: #fff;
    @extend %padding;
    .list{
        flex: 1;
        text-align: center;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        &.on{
            border-bottom: 2px solid $dayTheme;
            color: $dayTheme;
        }
    }
}
.title-nav-fixed{
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 11;
}

.search-content{
    @extend %padding;
}
.avatarDetail{
  @extend %padding;
  dt,dd{
    margin:0;
  }
  dt {
    font-size: 16px;
    border-left: 2px solid $dayTheme;;
    line-height: 1;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  p{
    color: #6e6f70;
    line-height: 180%;
    font-size: 13px;
    margin:10px 0;
  }
}
.prev-headerBg{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  height: 55px;
  width: 100%;
  background: #000;
  opacity: 0;
}
.operation{
  text-align: right;
  position: absolute;
  top: -30px;
  right: 10px;
  width: 100%;
  .item{
    display: inline-block;
    line-height: 25px;
    padding:0 15px;
    border-radius: 13px;
    color:#ccc;
    border:1px solid #ccc;
  }
}

.homeView-enter-active, .homeView-leave-active {
  transition: all .3s
}
.homeView-enter, .homeView-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}
</style>
