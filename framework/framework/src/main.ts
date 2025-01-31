import { createApp } from 'vue'
import App from './App.vue'
import "./style/reset.scss"

// 引入全局组件：顶部底部都是全局组件
import FrameworkTop from './components/framework_top/index.vue';
import FrameworkBottom from './components/framework_bottom/index.vue';
import Login from './components/login/index.vue'
import CountDown from './components/countdown/index.vue'

// 引入路由
import router from './router'
// 引入 lementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入pinia
import pinia from './store'
import'./permission'

const app = createApp(App)
// 全局组件
app.component('FrameworkTop', FrameworkTop)
app.component('FrameworkBottom', FrameworkBottom)
app.component('Login', Login)
app.component('CountDown', CountDown)
// 安装 router
app.use(router);
// 应用 pinia
app.use(pinia)
// 安装 element plus
app.use(ElementPlus,{
    locale: zhCn,
})
// 挂载
app.mount('#app')
