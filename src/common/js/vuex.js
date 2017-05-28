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
    timePercentage: 0,
    night: localStorage.night ? JSON.parse(localStorage.night) : false

  },
  mutations: {
    setSong (state, data) {
      state.song = data
    },
    setPlayState (state, data) {
      state.playState = data.state
      state.playState ? document.getElementById('audio').pause() : document.getElementById('audio').play()
    },
    setCurrentTime (state, time) {
      state.timePercentage = Math.round((time / document.getElementById('audio').duration) * 100)
    },
    nightToggle(state) {
      state.night = !state.night
    }
  },
  // getters: {
  //   progress: state => {
  //     return state.timePercentage
  //   }
  // },
  actions: {
    getFileLink({commit}, id) {
      return Vue.http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play', {
          params: {
              songid: id
          }
      })
    }

  }
})
