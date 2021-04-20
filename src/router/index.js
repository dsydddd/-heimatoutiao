import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

const router = new vueRouter({
    // 添加路由配置
    routes: [{
        name: 'login',
            path: '/login',
         
            component: () => import('@/views/user/login.vue')
        },
        { name: 'index',
            path: '/index',
           
            component: () => import('@/views/user/index.vue'),                     
        }

    ]

})

export default router