// 获取歌手歌曲列表
import Vue from 'vue'
class Serve {
    getSongList (option) {
        let method = 'baidu.ting.artist.getSongList'
        Vue.set(option, 'method', method)
        return Vue.http.jsonp('', {
            params: option
        })
    }
}
export default new Serve()

