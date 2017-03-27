    import store from '@/common/js/vuex.js'
    class Utils {
        $$(selector, context) {
            context = context || document
            var elements = context.querySelectorAll(selector)
            return Array.prototype.slice.call(elements)
        }
        // 获取歌曲详情，本地存储当前播放歌曲
        getSong(id) {
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
                localStorage.current_song = JSON.stringify(currentSong)
            })
        }
    }
    export default new Utils() 
