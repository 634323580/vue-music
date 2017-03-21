import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export default new Vuex.Store({
  state: {
    // 歌曲播放链接
    fileLink: '',
    // 歌曲播放状态
    playState: true,
    // 歌曲时间
    timePercentage: 0

  },
  mutations: {
    setPlayLink (state, data) {
      state.fileLink = data
    },
    setPlayState (state, data) {
      state.playState = data.state
      if (state.playState) {
          document.getElementById('audio').pause()
      } else {
          document.getElementById('audio').play()
      } 
    },
    setCurrentTime (state, time) {
      state.timePercentage = Math.round((time / document.getElementById('audio').duration) * 100)
    }
  },
  getters: {
    progress: state => {
      return state.timePercentage
    }
  },
  actions: {
    getFileLink({commit}, id) {
      return Vue.http.jsonp('baidu.ting.song.play', {
          params: {
              songid: id
          }
      })
      .then(res => {
       commit('setPlayLink', res.body.bitrate.file_link)
        return res.body.bitrate.file_link
      })
    }

  }
})
