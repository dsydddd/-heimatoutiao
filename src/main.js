import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import './styles/reset.less'
// 引入路由模块
import  router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
