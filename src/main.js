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
Vue.http.interceptors.push(function (request, next) {
  request.params.format = 'json'
  request.params.from = 'webapp_music'
  // continue to next interceptor
  next()
})

// 过滤器
Vue.filter('secToTime', function (s) {
  // 返回处理后的值
    var t = ''
    if (s > -1) {
        // var hour = Math.floor(s / 3600)
        var min = Math.floor(s / 60) % 60
        var sec = s % 60
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

// 路由钩子

router.beforeEach((to, from, next) => {
 if (from.path === '/') {
   store.commit('setOtherWebsites', true)
   console.log('从其他网站跳进来的')
 } else {
   store.state.otherWebsites && store.commit('setOtherWebsites', false)
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
