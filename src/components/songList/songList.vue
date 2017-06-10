<template>
    <div class="song-list" :class="{active: songId === songs.song.song_id}">
        <i v-if="songId === songs.song.song_id" class="iconfont active-icon">&#xe602;</i>
        <div class="item" @click="fileLink(songs.song.song_id, 1, songs.items)">
        <span class="img">
            <img :src="songs.song.pic_small ? songs.song.pic_small : songs.song.pic_big" alt="" width="52" height="52">
        </span>
        <div class="item-text .border-1px">
            <h3 class="item-title">{{songs.song.title}}</h3>
            <p>专辑：{{songs.song.album_title}}</p>
        </div>
        </div>
    </div>
</template>
<script>
import Utils from '@/common/js/utils.js'
import { mapState } from 'vuex'
export default {
    props: {
        songs: {
            type: Object,
            default() {
                return {}
            }
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
<style lang="scss" scoped>
@import '../../common/scss/mixin';
@import '../../common/scss/var.scss';
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
        /*border-bottom: 1px solid $day-border;*/
        @include border-1px($day-border);
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
.song-list{
    position: relative;
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
</style>
