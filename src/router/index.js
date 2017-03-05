import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Music from '@/view/music'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'on',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          name: 'music',
          path: '/music',
          component: Music
        },
        { path: '/', redirect: '/music' }
      ]
    },
    { path: '/123', component: Home },
    { path: '/*', redirect: '/home' }
  ]
})
