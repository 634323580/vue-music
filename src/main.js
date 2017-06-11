// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex，使用方法查看文档
import store from '@/common/js/vuex.js'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
import './common/scss/index.scss'
Vue.use(VueResource)
// Vue.http.options.root = 'http://tingapi.ting.baidu.com/v1/restserver/ting'

let abortAjxa = []
Vue.http.interceptors.push(function (request, next) {
  request.params.format = 'json'
  request.params.from = 'webapp_music'
  // continue to next interceptor
  if (request.url === 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play') {
    abortAjxa.forEach((item, index) => {
      item.abort()
      abortAjxa.splice(index, 1)
    })
    abortAjxa.push(request)
  }
  next()
})

// 过滤器
Vue.filter('secToTime', function (s) {
  // 返回处理后的值
  let t = ''
  if (s > -1) {
    // let hour = Math.floor(s / 3600)
    let min = Math.floor(s / 60) % 60
    let sec = s % 60
    // if (hour < 10) {
    //     t = '0' + hour + ":"
    // } else {
    //     t = hour + ":"
    // }

    if (min < 10) { t += "0" }
    t += min + ":"
    if (sec < 10) { t += "0" }
    t += Math.round(sec)
  }
  return t
})
// function parseLyric(lrc) {
//   let lyrics = lrc.split("\n")
//   let lrcObj = new Map()
//   for (let i = 0; i < lyrics.length; i++) {
//     let lyric = decodeURIComponent(lyrics[i])
//     let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
//     let timeRegExpArr = lyric.match(timeReg)
//     if (!timeRegExpArr) continue
//     let clause = lyric.replace(timeReg, '')
//     for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
//       let t = timeRegExpArr[k]
//       let min = Number(String(t.match(/\[\d*/i)).slice(1))
//       let sec = Number(String(t.match(/:\d*/i)).slice(1))
//       let time = min * 60 + sec
//       // lrcObj[time] = clause
//       lrcObj.set(time, clause)
//     }
//   }
//   return lrcObj
// }
// Vue.http.get("http://musicdata.baidu.com/data2/lrc/5736dcf00298fb7ea4ab2c58cd97483b/540999677/540999677.lrc")
//   .then(res => {
//     parseLyric(res.body)
//   })

// 路由钩子

router.beforeEach((to, from, next) => {
  if (from.path === '/') {
    sessionStorage.otherWebsites = true
    console.log('从其他网站跳进来的')
  } else {
    sessionStorage.otherWebsites && (sessionStorage.otherWebsites = false)
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
