// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import user from './router/phone/user.js'
import manger from './router/PC/manger.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '../static/font/font-awesome-4.7.0/css/font-awesome.min.css'

import cookies from '../static/js/cookies';
Vue.prototype.cookies = cookies;

//import url from '../static/js/path';
//Vue.prototype.url = url;

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import VueResource from 'vue-resource'
Vue.use(VueResource)

import animated from 'animate.css'
Vue.use(animated)

//import waterfall from 'vue-waterfall2'
//Vue.use(waterfall)

import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)

import vpay from 'vpay';

Vue.use(vpay);



//Uncaught (in promise) 报错解决方法 因vue-resource版本3.0.1问题，可更换3.1.1版本或者增加以下代码
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

var router = manger
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	router = user//手机
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
