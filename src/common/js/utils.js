import store from '@/common/js/vuex.js'
import router from '../../router/index'
class Utils {
    constructor() {
        this.setTime = null
        this.music = ['http://ws.stream.qqmusic.qq.com/107192078.m4a?fromtag=46', 'http://ws.stream.qqmusic.qq.com/410316.m4a?fromtag=46', 'http://ws.stream.qqmusic.qq.com/101091484.m4a?fromtag=46', 'http://ws.stream.qqmusic.qq.com/97758.m4a?fromtag=46']
        this.promiseArr = []
    }
    $$(selector, context) {
        context = context || document
        var elements = context.querySelectorAll(selector)
        return Array.prototype.slice.call(elements)
    }
    // 数组对象根据id去重去重
    removeDuplicated(ar) {
        let tmp = {}
        let ret = []
        for (var i = 0, j = ar.length; i < j; i++) {
            let item = ar[i].song_id
            if (!tmp[item]) {
                tmp[item] = 1
                ret.push(ar[i])
            }
        }
        return ret
    }
    // 返回上一页
    prev() {
        if (JSON.parse(sessionStorage.otherWebsites)) {
            router.push('/home')
            console.log('回首页')
            return
        }
        console.log('回上一页')
        router.go(-1)
    }
    // 添加到最近播放
    lately(song) {
        // 初始化本地存储
        if (!localStorage.lately) {
            localStorage.lately = '[]'
        }
        // 获取本地存储
        let latelyList = JSON.parse(localStorage.lately)
        if (!song) {
            return latelyList
        }
        // 添加最近播放
        latelyList.unshift(song)
        // 去重
        latelyList = this.removeDuplicated(latelyList)
        // 本地存储最近播放
        localStorage.lately = JSON.stringify(latelyList)
        // vuex修改最近播放数量
        store.commit('setLatelyLength', latelyList.length)
    }
    // 获取歌曲详情，本地存储当前播放歌曲
    getSong(id) {
        if (store.state.songId === id) {
            store.commit('setPlayState', { state: !store.state.playState })
            return false
        }
        // 立马改变当前播放id，不要等请求完再改变
        store.commit('setSongId', id)
        clearTimeout(this.setTime)
        this.setTime = setTimeout(() => {
            this.promiseArr.unshift(store.dispatch('getFileLink', id))
            console.log(this.promiseArr)
            this.promiseArr[0]
                .then((res) => {
                    let currentSong = {
                        // file_link: res.body.bitrate.file_link,
                        file_link: this.music[Math.floor(Math.random() * this.music.length)],
                        album_title: res.body.songinfo.album_title,
                        author: res.body.songinfo.author,
                        title: res.body.songinfo.title,
                        song_id: res.body.songinfo.song_id,
                        pic_big: res.body.songinfo.pic_big,
                        pic_small: res.body.songinfo.pic_small,
                        pic_radio: res.body.songinfo.pic_radio,
                        lrclink: res.body.songinfo.lrclink
                    }
                    store.commit('setSong', currentSong)
                    store.commit('setPlayState', { state: true })
                    localStorage.current_song = JSON.stringify(currentSong)
                    this.lately(currentSong)
                    this.promiseArr = []
                })
        }, 300)
    }
}
export default new Utils() 
