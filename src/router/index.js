import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Music from '@/view/music'
import Search from '@/view/search/search'
import Lately from '@/view/lately/lately'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'on',
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          name: 'music',
          path: 'music',
          component: Music
        },
        {
          name: 'search',
          path: 'search',
          component: Search
        },
        {
          name: 'lately',
          path: 'lately',
          component: Lately
        },
        // {
        //   name: 'song',
        //   path: 'song',
        //   component: song
        // },
        { path: '/', redirect: { name: 'music' } }
      ]
    },
    { path: '/123', component: Home },
    { path: '/*', redirect: '/home/music' }
  ]
})
