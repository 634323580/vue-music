<template>
    <transition name="homeView">
            <div class="search-wrapper">
                <div class="search-head">
                    <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
                    <div class="search-input">
                        <input type="input" id="your-input-id" placeholder="搜索音乐、歌手、专辑" v-model="searchVal" v-focus>
                        <span v-show="searchVal" class="input-clear closeIcon" @click.stop="searchVal = ''">×</span>
                    </div>
                </div>
                <div class="content" ref="content" style="height:100%;overflow:hidden;">
                    <scroll :data='songItems' :pullup="true" @scrollToEnd="songLoadMore()" v-show="!logController">
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
                            <songList :styles="2" :songs="songItems"></songList>
                            <loading v-show="loadingShow"></loading>
                            <li v-show="noMOre" style="text-align:center;margin-top:20px;font-size:13px;">没有更多数据</li>
                        </ul>
                    </scroll>
                    <scroll ref="logScroll" v-show="logController">
                        <ul class="searchLog search-content">
                            <li class="search-list" v-for="(item, index) in searchLog" :key="index" @click="searchVal = item">
                                {{item}}
                                <span class="delete closeIcon" @click.stop="logDelete(item)">×</span>
                            </li>
                            <li v-if="!searchLog.length" style="padding:20px 0;text-align:center;">没有搜索记录</li>
                        </ul>
                    </scroll>
                </div>
            </div>
        </transition>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import Loading from '@/components/loading/loading'
import songList from '@/components/songList/songList'
import serve from '../../serve'
import Utils from '@/common/js/utils.js'
export default {
    name: 'search',
    data() {
        return {
            // 搜索关键字
            searchVal: null,
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
            loadingShow: true,
            // songMoreController
            songMoreController: true,
            // noMore
            noMOre: false,
            searchLog: [],
            logController: true
        }
    },
    created () {
        this.searchLog = localStorage.searchLog ? JSON.parse(localStorage.searchLog) : []
        this.$nextTick(() => {
            this.input = document.getElementById("your-input-id")
            // this.input.focus()
            this.$refs.content.addEventListener('touchstart', (e) => {
                this.input.blur()
            })
        })
    },
    // beforeRouteLeave(to, from, next) {
    //     // this.clear()
    //     next()
    // },
    methods: {
        search() {
            // 延迟处理
            // 输入的是否空和是否全是空格
            if (Utils.isNull(this.searchVal)) {
                return
            }
            // 有东西就清空
            this.songItems.length && (this.songItems = [])
            this.artist && (this.artist = null)
            this.album && (this.album = null)
            this.page_no = 1
            this.noMOre = false
            // this.input.blur()
            this.loadingShow = true
            this.logController = Utils.isNull(this.searchVal)
            this.setSearchLog(this.searchVal)
            this.getSong(this.page_no, this.page_size, this.searchVal)
            this.time = false
        },
        setSearchLog(log) {
            // 去除左右两边空格
            log = log.replace(/(^\s*)|(\s*$)/g, "")
            this.searchLog.unshift(log)
            // 去重存入本地
            this.searchLog = Array.from(new Set(this.searchLog))
            localStorage.searchLog = JSON.stringify(this.searchLog)
        },
        getSong(page, size, query) {
            this.songMoreController = false
            let option = {
                    method: 'baidu.ting.search.common',
                    query: query,
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
                this.getSong(this.page_no, this.page_size, this.searchVal)
            }
        },
        logDelete(deletes) {
            this.searchLog.splice(this.searchLog.indexOf(deletes), 1)
            localStorage.searchLog = JSON.stringify(this.searchLog)
        }
    },
    watch: {
        searchVal(val, oldVal) {
            if (Utils.isNull(val)) {
                this.songItems = []
                this.artist = null
                this.album = null
                this.logController = true
                setTimeout(() => {
                    Utils.isNull(this.searchVal) && (this.$refs.logScroll.refresh())
                }, 20)
            } else {
                this.time && clearTimeout(this.time)
                this.time = setTimeout(() => {
                    this.search()
                }, 300)
            }
        }
    },
    components: {
        Scroll,
        Loading,
        songList
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
        // display: flex;
        position: relative;
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
        .input-clear{
            color:#fff;
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
.searchLog{
    .search-list{
        position: relative;
    }
}
.closeIcon{
    font-size: 22px;
    position: absolute;
    right:10px;
    top: 50%;
    transform: translateY(-50%);
    &:after{
        content:'';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -10px;
        right: -10px;
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
