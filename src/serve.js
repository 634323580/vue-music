// 获取歌手歌曲列表
import Vue from 'vue'
let serve = {
    url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
    get(option) {
        return Vue.http.jsonp(this.url, {
            params: option
        })
    }
}
// class Serve {
//     getSongList (option) {
//         let method = 'baidu.ting.artist.getSongList'
//         Vue.set(option, 'method', method)
//         return Vue.http.jsonp('', {
//             params: option
//         })
//     }
// }
// export default new Serve()
export default serve

