// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
import './common/scss/index.scss'
Vue.use(VueResource)
// Vue.http.options.root = 'https://api.douban.com/v2/'
Vue.http.interceptors.push(function (request, next) {
  console.log(request)
  // continue to next interceptor
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
