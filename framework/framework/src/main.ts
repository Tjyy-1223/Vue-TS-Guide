import { createApp } from 'vue'
import App from './App.vue'
import "./style/reset.scss"

// 引入全局组件：顶部底部都是全局组件
import FrameworkTop from './components/framework_top/index.vue';
import FrameworkBottom from './components/framework_bottom/index.vue';

const app = createApp(App)
// 全局组件
app.component('FrameworkTop', FrameworkTop)
app.component('FrameworkBottom', FrameworkBottom)
// 挂载
app.mount('#app')
