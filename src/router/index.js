import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchReps from '../components/SearchReps'
import RepresentativeCard from '../components/RepresentativeCard'
import scrollBehavior from './scroll-behavior'
// import Reps from '../components/Reps'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  //add Auth0 route
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/AuthenticationButton.vue')
  },
  {
    path: '/campaign/:campaignId',
    name: 'Campaign',
    component: () => import('../views/Campaign.vue'),
    children: [
      {
        path: 'postalcode/:postalCode?',
        name: 'Reps',
        component: SearchReps,
        props: true,
        children: [
          {
            path: 'member/:member',
            component: RepresentativeCard,
            name: 'RepClick',
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/complete',
    name: 'CompletePage',
    component: () => import('../views/CompletePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes
})

export default router
