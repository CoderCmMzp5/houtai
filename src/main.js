// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';  //elementUI
import MyServerHttp from '@/plugins/http.js'
/**
 * 之前的玩法
 */
// import axios from 'axios'
// Vue.prototype.$http=axios

import 'element-ui/lib/theme-chalk/index.css';//elementUI
import '@/assets/css/reset.css'//公共樣式
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(MyServerHttp)
new Vue({
  el: '#app',
  router,
  components: { App }, // 使用根组件
  template: '<App/>' // 模板把根组件放在模板中,把模板放在el中
})
