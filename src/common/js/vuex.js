import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export default new Vuex.Store({
  state: {
    // 当前播放歌曲信息
    song: {},
    // 歌曲播放状态
    playState: true,
    // 歌曲播放进度
    timePercentage: 0

  },
  mutations: {
    setSong (state, data) {
      state.song = data
    },
    setPlayState (state, data) {
      state.playState = data.state
      state.playState ? document.getElementById('audio').pause() : document.getElementById('audio').play()
      // if (state.playState) {
      //     document.getElementById('audio').pause()
      // } else {
      //     document.getElementById('audio').play()
      // } 
    },
    setCurrentTime (state, time) {
      state.timePercentage = Math.round((time / document.getElementById('audio').duration) * 100)
    }
  },
  // getters: {
  //   progress: state => {
  //     return state.timePercentage
  //   }
  // },
  actions: {
    getFileLink({commit}, id) {
      return Vue.http.jsonp('baidu.ting.song.play', {
          params: {
              songid: id
          }
      })
      .then(res => {
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
        commit('setSong', currentSong)
        return res
      })
    }

  }
})
