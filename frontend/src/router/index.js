import Vue from 'vue'
import VueRouter from 'vue-router'
// import auth from '../middleware/auth'
import VueRouteMiddleware from 'vue-route-middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import('../components/Header.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router