import store from '@/common/js/vuex.js'
import router from '../../router/index'
class Utils {
    constructor() {
        this.setTime = null
        this.time = 500
        this.music = ['http://ws.stream.qqmusic.qq.com/107192078.m4a?fromtag=46', 
                      'http://ws.stream.qqmusic.qq.com/410316.m4a?fromtag=46', 
                      'http://ws.stream.qqmusic.qq.com/101091484.m4a?fromtag=46', 
                      'http://ws.stream.qqmusic.qq.com/97758.m4a?fromtag=46',
                      'http://ws.stream.qqmusic.qq.com/97750.m4a?fromtag=46']
        // this.promiseArr = []
    }
    $$(selector, context) {
        context = context || document
        var elements = context.querySelectorAll(selector)
        return Array.prototype.slice.call(elements)
    }
    // 根据歌曲id去重
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
    // 获取本地存储
    getStorage(name, defaults = '[]') {
        let n = localStorage.getItem(name)
        if (!n || n === '') {
            localStorage.setItem(name, defaults)
            n = localStorage.getItem(name)
        }
        return JSON.parse(n)
    }
    // 添加到最近播放
    lately(song) {
        let latelyList = this.getStorage('lately')
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
    // 查找当前播放歌曲在播放列表第几
    searchIndex() {
        let indexs = ''
        let songId = store.state.songId
        store.state.playList.forEach((item, index) => {
            if (item.song_id === songId) {
                localStorage.songPrevIndex = localStorage.songIndex
                localStorage.songIndex = index
                indexs = index
            } 
        })
        return indexs
    }
    playList(type, data) {
        let playList = this.getStorage('playList')
        // 1为歌单， 2为单曲， 其他都不添加
        switch (type) {
            case 1:
            playList = data
            break
            case 2:
            data['song_id'] = data.songid
            let yes = this.searchIndex()
            let index = this.getStorage('songIndex', 0)
            // let index = parseInt(localStorage.songIndex)
            if (yes === '') {
                playList.splice(index + 1, 0, data)
                if (JSON.parse(localStorage.playList).length) {
                    localStorage.songIndex = index + 1
                }
            } else {
                // 找到
                // playList.splice(index, 1)
                // playList.splice(parseInt(localStorage.songPrevIndex), 0, data)
            }
            // playList.splice(index + 1, 0, data)
            // index ? playList.splice(index + 1, 0, data) : playList.push(data)
            break
            default:
            return
        }
        store.commit('setPlayList', playList)
        localStorage.playList = JSON.stringify(playList)
        return playList
    }
    // 获取歌曲详情，本地存储当前播放歌曲,
    getPlay(id, callback) {
        clearTimeout(this.setTime)
        this.setTime = setTimeout(() => {
            store.dispatch('getFileLink', id)
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
                    this.setTime = null
                    callback && callback()
                })
                .catch(e => {
                    // console.log(e)
                })
        }, this.time)
    }
    // 播放歌曲
    getSong(song, type = 3, data = []) {
        let id = song.song_id || song.songid
        if (store.state.songId === id) {
            store.commit('setPlayState', { state: !store.state.playState })
            return false
        }
        // 立马改变当前播放id，不要等请求完再改变
        store.commit('setSongId', id)
        if (song.song_id && song.title) {
            let currentSong = {
                // file_link: res.body.bitrate.file_link,
                file_link: '',
                album_title: song.album_title,
                author: song.author,
                title: song.title,
                song_id: song.song_id,
                pic_big: song.pic_big,
                pic_small: song.pic_small,
                pic_radio: song.pic_radio,
                lrclink: song.lrclink
            }
            store.commit('setSong', currentSong)
        }
        store.state.playState && document.getElementById('audio').pause()
        this.playList(type, data)
        type === 2 || this.searchIndex()
        this.getPlay(id, () => {
            // callback
            // this.playList(type, data)
            // type === 2 || this.searchIndex()
        })
    }
    // 上一首下一首 1为下一首 -1为上一首
    songChange(type = '') {
        clearTimeout(this.clearTime)
        this.clearTime = setTimeout(() => {
            let playList = store.state.playList
            // 当前播放是第几首
            let index = parseInt(localStorage.songIndex)
            if (store.state.playMOde === 1) {
                // 如果是随机模式都跑这里
                let random = Math.floor(Math.random() * playList.length)
                index = random
                // 判断随机获取到的数是不是当前播放，如果是则++
                if (parseInt(localStorage.songIndex) === random) {
                    index++
                    if (index >= playList.length) {
                        // 当前是否为最后一首
                        index = 0
                    }
                }
            } else {
                if (type === 1) {
                    // 上一首
                    index = index + 1
                    if (index >= playList.length) {
                        // 当前是否为最后一首
                        index = 0
                    }
                } else if (type === -1) {
                    // 下一首
                    index = !index ? playList.length - 1 : index - 1
                }
            }
            console.log(index)
            this.setTime = null
            this.getSong(store.state.playList[index])
        }, this.time)
    }
}
export default new Utils() 
