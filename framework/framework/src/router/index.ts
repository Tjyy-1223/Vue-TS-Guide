import {createRouter, createWebHistory} from 'vue-router'

// createRouter 方法: 用于创建路由器示例，可以管理多个路由
export default createRouter({
    // 路由模式设置
    history: createWebHistory(),
    // 管理路由
    routes:[
        // 至少有两个路由
        {
            path: '/home',
            component: () => import('../pages/home/index.vue')
        },
        {
            path: '/hospital',
            component: () => import('../pages/hospital/index.vue')
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    // 滚动行为，控制滚动条的位置
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})