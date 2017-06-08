    import store from '@/common/js/vuex.js'
    class Utils {
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
            store.commit('setPlayState', { state: false })
            // 立马改变当前播放id，不要等请求完再改变
            store.commit('setSongId', id)
            store.dispatch('getFileLink', id)
            .then((res) => {
                let currentSong = {
                            file_link: res.body.bitrate.file_link,
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
                localStorage.current_song = JSON.stringify(currentSong)
                store.commit('setPlayState', { state: true })
                this.lately(currentSong)
            })
        }
    }
    export default new Utils() 
