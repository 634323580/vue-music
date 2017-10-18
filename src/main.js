// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './filter'
// vuex，使用方法查看文档
import store from '@/common/js/vuex.js'
import VueResource from 'vue-resource'
import Alert from '@/common/js/alert.js'
Vue.config.productionTip = false
import './common/scss/index.scss'
Vue.use(VueResource)
// Vue.http.options.root = 'http://tingapi.ting.baidu.com/v1/restserver/ting'
Vue.use(Alert)
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
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

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
