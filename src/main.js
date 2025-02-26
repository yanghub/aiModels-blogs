import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import './assets/css/global.css'  //导入全局样式
import "./axios"
import "./permission"   //导入权限拦截

import mavonEditor from 'mavon-editor'  // 全局注册mavonEditor,md编辑器
import 'mavon-editor/dist/css/index.css'

// import hljs from 'highlight.js'  //高亮样式highlight.js
// import 'highlight.js/styles/googlecode.css'
// Vue.directive('highlight', (el) => {
//   let blocks = el.querySelectorAll('pre code')
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block)
//   })
// })

Vue.use(Element); //全局使用Element
Vue.prototype.$axios = axios; //axios
Vue.use(mavonEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
