// Importe Vue + vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HomePage from '../views/HomePage.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
},
{
    path: '/homepage',
    name: 'HomePage',
    component: HomePage
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;