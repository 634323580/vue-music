import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/view/home'
import Music from '@/view/music'
import Search from '@/view/search/search'
import Lately from '@/view/lately/lately'
import Ranking from '@/view/ranking'
import Toplist from '@/view/toplist'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'on',
  routes: [
    { name: 'music', path: '/music', component: Music },
    { name: 'search', path: '/search', component: Search },
    { name: 'lately', path: '/lately', component: Lately },
    { 
      name: 'ranking', 
      path: '/ranking', 
      component: Ranking,
      children: [
        {name: 'toplist', path: ':type', component: Toplist}
      ]
    },
    { path: '/*', redirect: '/music' }
  ]
})

// export default new Router({
//   linkActiveClass: 'on',
//   routes: [
//     { name: 'music', path: '/music', component: resolve => require(['@/view/music'], resolve) },
//     { name: 'search', path: '/search', component: resolve => require(['@/view/search/search'], resolve) },
//     { name: 'lately', path: '/lately', component: resolve => require(['@/view/lately/lately'], resolve) },
//     { 
//       name: 'ranking', 
//       path: '/ranking', 
//       component: resolve => require(['@/view/ranking'], resolve),
//       children: [
//         {name: 'toplist', path: ':type', component: resolve => require(['@/view/toplist'], resolve)}
//       ]
//     },
//     { path: '/*', redirect: '/music' }
//   ]
// })
