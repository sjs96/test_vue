// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './configure/router'
import axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import {getloginUser} from './util/user'
import {isNotNull} from './util/isNotNull'
import {setSpecialParams} from './util/util'
import {connect} from './util/websocket'
import {myMessage} from './util/message';
import {errMessage} from './util/util';
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.prototype.$axios=axios;

//Vue.use(VueSocketio, socketio('localhost:8888'), store);
var loadingInstance
// http request 拦截器
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({ fullscreen: true,background: 'rgba(0, 0, 0, 0.7)' });
    config.data = setSpecialParams(config) //后台接收的参数，后面我们将说明后台如何接收
    console.log(config)
    return config;
  },
  err => {
    loadingInstance.close();
    myMessage({message: '网络异常！ 错误：201',type: 'warning'})
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    loadingInstance.close();
    if(response.data.status == 200) {
      myMessage({message: '错误200', type: 'warning'})
      this.$router.push('/')
    }
    return response;
  },
  error => {
    loadingInstance.close();
    errMessage(error)
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

Vue.config.productionTip = false
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  //websocket
  connect()
  // 判断页面是否是必须登陆才能访问
  if (to.meta.requiresAuth) {
    // 获取token
    const token = getloginUser().token;
    // 如果有token,直接访问页面
    if (isNotNull(token)) {
      next()
    } else {
      // 没有token ，跳转到登陆页面
      myMessage({message: '请登录',type: 'warning'})
      next({
        path: '/'
      })
    }
  } else {
    // 页面无限制，直接访问页面
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
