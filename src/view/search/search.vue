<template>
    <transition name="homeView">
            <div class="search-wrapper">
                <div class="search-head">
                    <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
                    <div class="search-input">
                        <input type="input" id="your-input-id" placeholder="搜索音乐、歌手、专辑" v-model="searchVal" @keyup.enter="search()">
                    </div>
                </div>
                <scroll :data='songItems' :pullup="true" @scrollToEnd="songLoadMore()">
                    <ul class="search-content">
                        <router-link tag="li" :to="{name: 'artist', params:{artist: artist}}" class="artist-matching search-list" v-if="artist">
                            <img class="avatar" :src="artist.avatar.small" width="48" height="48">
                            <div class="nowrap">
                                <p class="text">歌手：{{artist.name}}({{artist.country}})</p>
                            </div>
                        </router-link>
                        <li class="artist-matching search-list" v-if="album">
                            <img class="avatar" :src="album.pic_small" width="48" height="48">
                            <div class="nowrap">
                                <p class="text">专辑：{{album.title}}({{album.publishcompany}})</p>
                                <p>发行时间：{{album.publishtime}}</p>
                            </div>
                        </li>
                        
                        <li class="search-list" v-for="(item, index) in songItems" :key="index" @click='fileLink(item, 2, item)' >
                            <div class="songname">
                                <span v-html="item.title"></span>
                                <span class="album" v-html="'-' + item.author"></span>
                            </div>
                            <div class="album" v-html="item.album_title"></div>
                            <div class="info" v-html="item.info"></div>
                        </li>
                        <loading v-show="loadingShow"></loading>
                        <li v-show="noMOre" style="text-align:center;margin-top:20px;font-size:13px;">没有更多数据</li>
                    </ul>
                </scroll>
            </div>
        </transition>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import Loading from '@/components/loading/loading'
import serve from '../../serve'
import Utils from '@/common/js/utils.js'
export default {
    name: 'search',
    data() {
        return {
            // 搜索关键字
            searchVal: null,
            // 当前tab
            type: 1,
            // 加载第几页 
            page_no: 1,
            // 每次加载数目 
            page_size: 50,
            // 歌曲列表 
            songItems: [],
            // 歌手
            artist: null,
            // 专辑
            album: null,
            // 控制loading显示
            loadingShow: false,
            // songMoreController
            songMoreController: true,
            // noMore
            noMOre: false
        }
    },
    created () {
        this.$nextTick(() => {
            this.input = document.getElementById("your-input-id")
            this.input.focus()
        })
    },
    activated () {
        this.$nextTick(() => {
            this.input.focus()
        })
    },
    beforeRouteLeave(to, from, next) {
        // this.clear()
        next()
    },
    methods: {
        search() {
            this.songItems.length && (this.songItems = [])
            this.artist && (this.artist = null)
            this.album && (this.album = null)
            this.type = 1
            this.page_no = 1
            this.noMOre = false
            this.input.blur()
            this.loadingShow = true
            this.getSong(this.page_no, this.page_size)
        },
        getSong(page, size) {
            this.songMoreController = false
            let option = {
                    method: 'baidu.ting.search.common',
                    query: this.searchVal,
                    page_no: page,
                    page_size: size
                }
            serve.get(option)
                .then(res => {
                    if (!this.artist && res.data.artist) {
                        this.artist = res.data.artist
                    }
                    if (!this.album && res.data.album) {
                        this.album = res.data.album
                    }
                    if (res.data.song_list) {
                        this.songItems = this.songItems.concat(res.data.song_list)
                        this.songMoreController = true
                    } else {
                        this.noMOre = true
                    }
                    this.loadingShow = false
            })
        },
        fileLink(id, type, data) {
            Utils.getSong(id, type, data)
        },
        prev() {
            // this.clear()
            Utils.prev()
        },
        clear() {
            this.songItems = []
            this.searchVal = null
            this.artist = null
            this.album = null
            this.loadingShow = false
        },
        songLoadMore() {
            if (this.songMoreController) {
                this.page_no ++
                this.loadingShow = true
                this.getSong(this.page_no, this.page_size)
            }
        },
        switchTab(type) {
            this.type = type
        }
    },
    components: {
        Scroll,
        Loading
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.search-wrapper{
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: $dayBg;
}
.search-head{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    height:55px;
    display: flex;
    background: $dayTheme;
    @extend %padding;
    align-items: center;
    .prev-btn{
        flex: 0 0 50px;
        i{
            color: #fff;
            font-size: 28px;
            margin-left: 7px;
        }
    }
    .search-input{
        flex: 1;
        display: flex;
        height: 35px;
        border-bottom: 1px solid #edaeab;
        input{
            height: 35px;
            width: 100%;
            background: transparent;
            border:none;
            outline: none;
            font-size: 15px;
            color:#fff;
            &::-moz-input-placeholder { color: #db5d56; }
            &::-webkit-input-placeholder { color:#db5d56; }
            &:-ms-input-placeholder { color:#db5d56; }

        }
    }
}
.search-content{
    @extend %padding;
    padding-top: 55px;
    padding-bottom: 105px;
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
.artist-matching{
    display: flex;
    flex-flow: row;
    justify-content: flex-start;;
    align-items: center;
    .avatar{
        vertical-align: middle;
        margin-right: 8px;
    }
}
.nowrap{
    overflow: hidden;
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
