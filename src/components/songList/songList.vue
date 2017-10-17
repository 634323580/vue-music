<template>
    <ul>
        <template v-if="styles === 1">
            <li v-for="item in songs" :key="item.song_id" class="song-list" :class="{active: songId === item.song_id}" @click="fileLink(item, 1, songs)">
                <i v-if="songId === item.song_id" class="iconfont active-icon">&#xe602;</i>
                <span class="img">
                    <img :src="item.pic_small ? item.pic_small : item.pic_big" alt="" width="52" height="52">
                </span>
                <div class="item-text .border-1px">
                    <h3 class="item-title">{{item.title}}</h3>
                    <p>专辑：{{item.album_title}}</p>
                </div>
            </li>
        </template>
        <template v-if="styles === 2">
            <li class="search-list" v-for="(item, index) in songs" :key="index" @click='fileLink(item, 2, item)' >
                <div class="songname">
                    <span v-html="item.title"></span>
                    <span class="album" v-html="'-' + item.author"></span>
                </div>
                <div class="album" v-html="item.album_title"></div>
                <div class="info" v-html="item.info"></div>
            </li>
        </template>
        <template v-if="styles === 3">
            <li class="search-list" v-for="(item, index) in songs" :key="index" @click='fileLink(item, 1, songs)' >
                <div class="songname">
                    <span v-html="item.title"></span>
                    <span class="album" v-html="'-' + item.author"></span>
                </div>
                <div class="album" v-html="item.album_title"></div>
                <div class="info" v-html="item.info"></div>
            </li>
        </template>
    </ul>
</template>
<script>
import Utils from '@/common/js/utils.js'
import { mapState } from 'vuex'
export default {
    props: {
        songs: {
            type: Array,
            default() {
                return []
            }
        },
        styles: {
            type: Number,
            default: 1
        }
    },
    methods: {
        fileLink(id, type, data) {
            Utils.getSong(id, type, data)
        }
    },
    computed: {
        ...mapState({
            songId (state) {
                return state.songId
            }
        })
    }
}
</script>
<style lang="scss">
@import '../../common/scss/mixin';
@import '../../common/scss/var.scss';
.song-list{
    position: relative;
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
        /*border-bottom: 1px solid $day-border;*/
        @include border-1px($day-border);
        overflow: hidden;
        padding-right: 30px;
        .item-title{
            font-weight: normal;
            color:#222;
            margin-top: 5px;
        }
        p{
            color:#717170;
            font-size: 12px;
        }
        .item-title,p{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
.song-list.active{
    .active-icon{
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
    }
}
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
        em {
            color:cornflowerblue;
        }
    }
    .info{
        font-size: 13px;
        color: #666768;
    }
}

</style>
