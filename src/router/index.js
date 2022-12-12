// 路由-相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Register from '@/views/login/register.vue'
import Home from '@/views/Home/index.vue'
import Info from '@/views/login/info.vue'

Vue.use(VueRouter)
const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/info',
        component: Info,
    }, {
        path: '/home',
        component: Home,
    }
]

const router = new VueRouter({
    routes
})

export default router