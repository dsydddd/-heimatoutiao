import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

const router = new vueRouter({
    // 添加路由配置
    routes: [
        {
            path: '/',
            redirect: { name: 'index' }
        },
        {
            name: 'index',
            path: '/index',

            component: () => import('@/views/index.vue'),
        },

        {
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
            name: 'post',
            path: '/post/:id',
            component: () => import('@/views/post/postdetail.vue'),
        },
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('@/views/user/myfollow.vue')
        },
        {
            name: 'mystar',
            path: '/mystar',
            component: () => import('@/views/user/mystar.vue')
          },
          {
            name:'comment',
            path:'/comment/:id',
            component: () => import('@/views/user/comment.vue')
        }
 

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