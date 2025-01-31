// 全局守卫
import router from "./router"
// 引入进度条
import Nprogress from 'nprogress'
//引入进度条的样式
import "nprogress/nprogress.css"
import useUserStore from "./store/modules/user"
import panic from "./store"
let userStore = useUserStore(panic);

Nprogress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {
    Nprogress.start();

    let whiteList = ["/home", '/hospital/register'];  // 白名单
    let token = userStore.userInfo.token;

    if (token) {
        next();  // 如果有token，直接进入
    } else {
        if (whiteList.includes(to.path)) {
            next();  // 如果是白名单中的页面，允许访问
        } else {
            userStore.visiable = true;  // 显示登录框
            next({ path: '/home' });  // 未登录跳转到登录页
        }
    }
})

router.afterEach(() => {
    Nprogress.done();  // 路由跳转完后关闭进度条
})
