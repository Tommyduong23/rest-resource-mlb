import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
 {
   path: '/teams',
   name: 'Teams',
   component: () =>
     import(/* webpackChunkName: "teams" */ '../views/TeamList.vue'),
 },
  {
    path: '/teams/:id',
    name: 'Team Details',
    props: true,
    component: () =>
      import(/* webpackChunkName: "teams" */ '../views/TeamDetails.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
