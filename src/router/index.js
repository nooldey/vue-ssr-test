import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createView = id => () => import('../views/createView').then(m => m.default(id))

const MovieDetail = () => import('../views/movie.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/on',
        component: createView('moving')
      },
      {
        path: '/coming',
        component: createView('coming')
      },
      {
        path: '/top',
        component: createView('top')
      },
      {
        path: '/movie/:id(\\d+)',
        component: MovieDetail
      },
      {
        path: '/',
        redirect: '/on'
      }
    ]
  })
}
