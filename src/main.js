import Vue from 'vue'
import App from '@/App.vue'

// 引入全局样式
import '@/styles/reset.less'
// 引入路由模块
import router from '@/router/index'

// 引入移动端开发插件
import {
  Toast,
  Icon,
  Uploader,
  Dialog,
  Field,
  ActionSheet
} from 'vant';
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
.use(ActionSheet);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')