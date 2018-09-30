// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element全局使用，组件中部分导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 全局配置，但是在后期可以在每次请求之前做一个后端的用户权限配置
import axios from 'axios'
Vue.prototype.$http = axios
// 转化为pdf
import htmlToPdf from './utils/htmlToPdf'
Vue.use(htmlToPdf)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
