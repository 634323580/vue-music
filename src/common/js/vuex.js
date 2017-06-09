import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export default new Vuex.Store({
  state: {
    // 当前播放歌曲信息
    song: {},
    // 获取歌曲id
    songId: Number,
    // 歌曲播放状态
    playState: false,
    // 歌曲播放进度
    timePercentage: 0,
    // 白天黑夜切换
    night: localStorage.night ? JSON.parse(localStorage.night) : false,
    // 最近播放长度
    latelyLength: localStorage.lately && JSON.parse(localStorage.lately).length
    // 是否从其他网站跳转进来的
    // otherWebsites: false
  },
  mutations: {
    setSong (state, data) {
      state.song = data
    },
    setPlayState (state, data) {
      state.playState = data.state
    },
    setCurrentTime (state, time) {
      if (!time.duration) {
        return
      }
      state.timePercentage = (time.currentTime / time.duration) * 100
    },
    nightToggle (state) {
      state.night = !state.night
    },
    setLatelyLength (state, length) {
      state.latelyLength = length
    },
    setSongId(state, id) {
      state.songId = id
    }
    // setOtherWebsites(state, data) {
    //   state.otherWebsites = data
    // }
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
