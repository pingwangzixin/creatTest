// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/reset.css';
import './assets/css/public.css';
//import './assets/css/animate.css';
import './assets/iconFont/iconfont.css';
import './assets/css/main.css';


import "./assets/css/index.css"
import "jquery"
import "fabric"
/*import './assets/common/ueditor/ueditor.config.js'
import './assets/common/ueditor/ueditor.all.js'
//语言
import './assets/common/ueditor/lang/zh-cn/zh-cn.js'*/
/*import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
//语言
import '../static/ueditor/lang/zh-cn/zh-cn.js'*/

//import Axios from 'axios';

Vue.config.productionTip = false;
//Vue.prototype.$http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


