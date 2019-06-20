import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import users from '@/components/users/users'
// @指的是src文件夹,webpack模板封装好的功能
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        name: 'users',
        path: '/users',
        component: users
      }]
    }
  ]
})
