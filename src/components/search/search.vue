<template>
    <transition name="search">
        <div class="search-wrapper" v-show="toggle">
            <div class="search-head">
                <div class="prev-btn" @click='prev()'><i class="iconfont">&#xe69f;</i></div>
                <div class="search-input">
                    <input type="input" id="your-input-id" placeholder="搜索音乐、歌手" v-model="searchVal" @keyup.enter="search()">
                </div>
            </div>
            <scroll :scrollStyle='scrollStyle'>
                <ul class="search-content">
                    <li class="search-list"v-for="(item, index) in items.song" @click='fileLink(item.songid)' >
                        <div class="songname">{{item.songname}}
                            <span class="album">-{{item.artistname}}</span>
                        </div>
                        <div class="album" v-if="items.album && items.album[index]">{{items.album[index].artistname}}-{{items.album[index].albumname}}</div>
                        <div class="info">{{item.info}}</div>
                    </li>
                </ul>
            </scroll>
        </div>
    </transition>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import serve from '../../serve'
import Bus from '@/common/js/bus.js'
import Utils from '@/common/js/utils.js'
export default {
    name: 'search',
    data() {
        return {
            scrollStyle: {
                paddingTop: 55 + 'px',
                paddingBottom: 45 + 'px'
            },
            searchVal: null,
            items: [],
            toggle: false
        }
    },
    created () {
        this.$nextTick(() => {
            this.input = document.getElementById("your-input-id")
        })
        Bus.$on('toggle', () => {
            this.toggle = !this.toggle
            setTimeout(() => {
                this.input.focus()
            })
        })
    },
    methods: {
        search() {
            this.input.blur()
            let option = {
                    method: 'baidu.ting.search.catalogSug',
                    query: this.searchVal,
                    r: '20',
                    offset: '20'
                }
            serve.get(option)
                .then(res => {
                    this.items = res.data
                    // console.log(res)
                    Bus.$emit('resetScroll')
                })
        },
        fileLink(id) {
            Utils.getSong(id)
        },
        prev() {
            this.toggle = false
            this.items = []
            this.searchVal = null
        }
    },
    components: {
        Scroll
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.search-wrapper{
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 45px;
    right: 0;
    left: 0;
    background: $dayBg;
}
.search-head{
    position: relative;
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
.search-enter-active, .search-leave-active {
  transition: all .3s
}
.search-enter, .search-leave-active {
  opacity: 0;
  transform: translate3d(0,10%,0);
}

</style>
