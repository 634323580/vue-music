// 获取歌手歌曲列表
import Vue from 'vue'
class Serve {
    getSongList (option) {
        return Vue.http.jsonp('', {
            params: option
        })
    }
}
export default new Serve()

