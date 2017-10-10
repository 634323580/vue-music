<template>
    <scroll ref="scroll" :data="toplist">
        <ul class="toplist">
            <router-link tag='li' class="item" v-for="list in toplist" :to='{path:`ranking/${list.path}`}' :key="list.path">
                <div class="icon">
                    <img width="100"
                        height="100"
                        :src="list.icon" alt="没有图片">
                </div>
                <ul class="songlist">
                    <li v-for="(item, index) in list.item" :key="item.album_id"><span>{{index + 1}}</span> <span>{{item.title}}-{{item.artist_name}}</span></li>
                </ul>
            </router-link>
        </ul>
    </scroll>
</template>
<script>
import serve from '../../serve'
import scroll from '../scroll/scroll'
import Bus from '@/common/js/bus'
export default {
    data () {
        return {
            toplist: []
        }
    },
    created () {
        this.getTopList(1)
        .then(() => {
            return this.getTopList(2)
        })
        .then(() => {
            return this.getTopList(11)
        })
        .then(() => {
            return this.getTopList(12)
        })
        .then(() => {
            return this.getTopList(16)
        })
        .then(() => {
            return this.getTopList(21)
        })
        .then(() => {
            return this.getTopList(22)
        })
        .then(() => {
            return this.getTopList(23)
        })
        .then(() => {
            return this.getTopList(24)
        })
        .then(() => {
            this.$emit('loadHide')
            this.getTopList(25)
        })
        Bus.$on('resetScroll', () => {
            this.$refs.scroll.refresh()
        })
    },
    methods: {
        getTopList(types) {
            let option = {
                method: 'baidu.ting.billboard.billList',
                type: types,
                size: 3,
                offset: 0
            }
            return serve.get(option)
                .then((res) => {
                    this.toplist.push({
                        icon: res.data.billboard.pic_s210,
                        item: res.data.song_list,
                        path: types
                    })
                })
        }
    },
    components: {
        scroll
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/var';
.toplist{
    padding: 55px 15px;
}
.item{
    display: flex;
    background: $dayBg;
    margin: 15px 0;
    .icon{
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        img{
            display: block;
            font-size: 12px;
        }
    }
}
.songlist{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    height: 100px;
    overflow: hidden;
    font-size: 12px;
    li{
        font-size: 13px;
        line-height: 180%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>
