<template>
  <transition name="homeView">
    <div class="artist" v-if="artist">
        <prevheader :title='artist.name' styleOpacity="Opacity"></prevheader>
        <div class="avatar"  ref="avatar">
          <img :src="artist.avatar.big" alt="">
        </div>
        <ul class="title-nav title-nav-fixed" v-show="!nav">
              <li class="list" :class="{on: type === 1}" @click="switchTab(1)">热门50</li>
              <li class="list" :class="{on: type === 2}" @click="switchTab(2)">歌手信息</li>
              <li class="list" :class="{on: type === 3}" @click="switchTab(3)">专辑</li>
        </ul>
        <div class="bg">
          <scroll ref="scroll" :probeType="probeType" :listenScroll="true" @scroll="__scroll">
            <div class="artils-content">
              <ul class="title-nav">
              <li class="list" :class="{on: type === 1}" @click="switchTab(1)">热门50</li>
              <li class="list" :class="{on: type === 2}" @click="switchTab(2)">歌手信息</li>
              <li class="list" :class="{on: type === 3}" @click="switchTab(3)">专辑</li>
              </ul>
              <ul v-show="type === 1" class="notSong search-content">
                  <li class="search-list" v-for="(item, index) in notSong" :key="index" @click='fileLink(item, 2, item)' >
                      <div class="songname">
                          <span v-html="item.title"></span>
                          <span class="album" v-html="'-' + item.author"></span>
                      </div>
                      <div class="album" v-html="item.album_title"></div>
                      <div class="info" v-html="item.info"></div>
                  </li>
                  <li v-show="!notSong.length">
                    <loading></loading>
                  </li>
              </ul>
              <dl class="avatarDetail" v-show="type === 2">
                <dt>歌手简介</dt>
                <dd v-if="avatarDetail">
                  <p>{{avatarDetail.intro}}</p>
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
import Utils from '@/common/js/utils.js'
import prevheader from '@/components/prevheader/prevheader'
import Loading from '@/components/loading/loading'
export default {
  data() {
      return {
        artist: null,
        type: 2,
        probeType: 3,
        nav: true,
        notSong: [],
        avatarDetail: null
      }
  },
  activated() {
    if (!this.$route.params.artist) {
      this.$router.push({path: '/'})
      return
    }
    this.artist = this.$route.params.artist
    setTimeout(() => {
      this.avatar = this.$refs.avatar
      this.scroll = this.$refs.scroll
    }, 20)
    this.switchTab(1)
  },
  beforeRouteLeave(to, from, next) {
    this.notSong = []
    this.avatarDetail = null
    next()
  },
  methods: {
    __scroll(pos) {
      let scale = 1
      if (pos.y > 1) {
        scale += (pos.y - 1) / 200
        this.avatar.style.WebkitTransform = `scale(${scale})`
      } else {
        this.avatar.style.WebkitTransform = `scale(${1}) translate3d(0, ${pos.y > -80 ? pos.y : -80}px, 0)`
        if (pos.y <= (-105 - 55)) {
          this.nav = false
        } else {
          this.nav = true
        }
      }
    },
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
    getAvatarDetail(id) {
        let option = {
                method: 'baidu.ting.artist.getinfo',
                tinguid: id
            }
      serve.get(option)
        .then(res => {
          console.log(res.data)
          this.avatarDetail = res.data
          setTimeout(() => {
            this.scroll.refresh()
          }, 20)
        })
    },
    switchTab(type) {
      this.type = type
      switch (type) {
        case 1:
        if (this.notSong.length) {
          return
        }
        this.artistSong(this.artist.ting_uid)
        break
        case 2:
        if (this.avatarDetail) {
          return
        }
        this.getAvatarDetail(this.artist.ting_uid)
        break
        case 3:
      }
    },
    fileLink(id, type, data) {
        Utils.getSong(id, type, data)
    }
  },
  components: {
    Scroll,
    prevheader,
    Loading
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
    box-sizing: border-box;
    padding-bottom: 260px;
  }
  .avatar{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;;
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
    .search-list{
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e7e9ea;
        .songname,.album,.info{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .songname{
            font-size: 14px;
            color: #1d1e1e;
        }
        .album{
            font-size: 12px;
            color: #6e6f70;
        }
        .info{
            font-size: 13px;
            color: #666768;
        }
    }
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
