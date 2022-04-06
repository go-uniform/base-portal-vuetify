import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/otp',
    name: 'Otp',
    component: () => import('../views/Otp.vue'),
  },
  {
    path: '/users/view/:id',
    name: 'UsersView',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: '/users/edit/:id',
    name: 'UsersEdit',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users/add',
    name: 'UsersAdd',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/user-roles',
    name: 'UserRoles',
    component: () => import('../views/UserRoles.vue'),
  },
  {
    path: '/user-roles/view/:id',
    name: 'UserRolesView',
    component: () => import('../views/UserRolesView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
