import Vue from 'vue'
import Router from 'vue-router'
import Login from '../../views/special/login'
import Home from '../../views/base/home/index'
import Error from '../../views/special/error'
import Unfinished from '../../views/special/unfinished'
import Base from '../../views/base/base/index'
import develop_document from '../../views/develop/document/index'
Vue.use(Router)
var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },

    {
      path: '/sys_meter',
      name: 'sys_meter',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/sys_user',
      name: 'sys_user',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/sys_role',
      name: 'sys_role',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/sys_menu',
      name: 'sys_menu',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/sys_jurisdiction',
      name: 'sys_jurisdiction',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/sys_price',
      name: 'sys_price',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/order_order',
      name: 'order_order',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/recharge_recharge',
      name: 'recharge_recharge',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/other_problem',
      name: 'other_problem',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/other_notice',
      name: 'other_notice',
      component: Base,
      meta: { requiresAuth: true },
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      name: 'Error',
      component:Error
    },
    {
      path: '/Unfinished',
      name: 'Unfinished',
      component:Unfinished,
    },
    {
      path: '/test_test',
      name: 'test_test',
      component: Base,
      meta: { requiresAuth: true },
    },
  ]
})
export default router
