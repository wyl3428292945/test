import Vue from 'vue'
import VueRouter from 'vue-router'
import ebeecake from '../views/ebeecake'
import cake from "../views/cake"
import food from "../views/food"
import activity from "../views/activity"
import prefecture from "../views/prefecture"
import login from "../views/login"
import register from "../views/register"
import detail from "../views/detail"
import balance from "../views/balance"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ebeecake',
    component: ebeecake
  },
  {
    path:'/cake',
    alias:'/tea',
    name:'cake',
    component: cake
  },
  {
    path:'/food',
    name:'food',
    component: food
  },
  {
    path:'/activity',
    name:'activity',
    component: activity
  },
  {
    path:'/prefecture',
    name:'prefecture',
    component: prefecture
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/register',
    name:'register',
    component: register
  },
  {
    path:'/detail',
    name:'detail',
    component: detail
  },
  {
    path:'/balance',
    name:'balance',
    component: balance
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
