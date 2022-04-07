import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('../views/Otp.vue'),
  },
  {
    path: '/users/view/:id',
    name: 'users-view',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: '/users/edit/:id',
    name: 'users-edit',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users/add',
    name: 'users-add',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/user-roles',
    name: 'users-roles',
    component: () => import('../views/UserRoles.vue'),
  },
  {
    path: '/user-roles/view/:id',
    name: 'user-roles-view',
    component: () => import('../views/UserRolesView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
