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
        {
            name: 'register',
            path: '/register',

            component: () => import('@/views/user/register.vue'),
        },
        {
            name: 'personal',
            path: '/personal/:id',

            component: () => import('@/views/user/personal.vue'),
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue'),
        },


        {
            name: 'index',
            path: '/index',

            component: () => import('@/views/user/index.vue'),
        },

    ]

})
import { Toast } from 'vant'
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') !== -1){
      let token=  localStorage.getItem('heimatoken')
        if (token) {
            console.log(1);
            next()
        }  else {
           next({name:'login'}),
            Toast("尚未登录,请先登录")
        }  
    } else {
        next()
    }
})


export default router