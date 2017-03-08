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
Vue.http.options.root = 'http://tingapi.ting.baidu.com/v1/restserver/ting'
Vue.http.interceptors.push(function (request, next) {
  request.params.format = 'json'
  request.params.from = 'webapp_music'
  // continue to next interceptor
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
