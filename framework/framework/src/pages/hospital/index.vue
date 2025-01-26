<template>
    <!-- 整体医院页面容器 -->
    <div class="hospital">
        
        <!-- 左侧菜单区域 -->
        <div class="menu">
            <!-- 顶部的路径导航，显示当前所在的页面路径 -->
            <div class="top">
                <!-- 使用 Element Plus 提供的 HomeFilled 图标 -->
                <el-icon><HomeFilled/></el-icon>
                <!-- 显示当前页面路径，路径是“/ 医院详情信息” -->
                <p>/ 医院详情信息</p>
            </div>

            <!-- Element Plus 的菜单组件 -->
            <!-- :default-active="..." 表示根据当前路径自动选中对应的菜单项 -->
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                
                <!-- 预约挂号菜单项 -->
                <el-menu-item index="hospital/register" @click="changeActive('/hospital/register')">
                    <!-- 使用 Element Plus 提供的图标 -->
                    <el-icon><icon-menu /></el-icon>
                    <span>预约挂号</span>
                </el-menu-item>

                <!-- 医院详情菜单项 -->
                <el-menu-item index="hospital/detail" @click="changeActive('/hospital/detail')">
                    <el-icon><document /></el-icon>
                    <span>医院详情</span>
                </el-menu-item>

                <!-- 预约通知菜单项 -->
                <el-menu-item index="hospital/notice" @click="changeActive('/hospital/notice')">
                    <el-icon><setting /></el-icon>
                    <span>预约通知</span>
                </el-menu-item>

                <!-- 停诊信息菜单项 -->
                <el-menu-item index="hospital/close" @click="changeActive('/hospital/close')">
                    <el-icon><InfoFilled /></el-icon>
                    <span>停诊信息</span>
                </el-menu-item>

                <!-- 查询取消菜单项 -->
                <el-menu-item index="hospital/search" @click="changeActive('/hospital/search')">
                    <el-icon><Search /></el-icon>
                    <span>查询取消</span>
                </el-menu-item>

            </el-menu>
        </div>

        <!-- 右侧内容区域，路由视图 -->
        <div class="content">
            <!-- 这里用 <router-view> 显示对应的路由内容 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入 Element Plus 图标
import {
    Document,
    HomeFilled,
    Menu as IconMenu,
    InfoFilled,
    Location,
    Search,
    Setting,
} from '@element-plus/icons-vue'

// 引入 Vue Router 的路由相关函数
import { useRoute, useRouter } from 'vue-router';

// 获取当前的路由信息和路由对象
let $route = useRoute(); // 获取当前路由信息
let $router = useRouter(); // 获取路由对象，用来进行路由跳转

// 菜单项点击事件
const changeActive = (path: string) => {
    // 使用 $router.push() 方法实现路由跳转
    $router.push({ path });
}

// 准备加载 pinia 数据
import { onMounted } from 'vue';
import useDetailStore from '../../store/modules/hospitalDetail';
let detailStore = useDetailStore();
onMounted(()=>{
    detailStore.getHospital($route.query.hoscode)
})

</script>

<style scoped lang="scss">
/* 样式部分，使用了 flexbox 布局 */

.hospital {
    display: flex; /* 使用 flexbox 布局 */

    /* 左侧菜单区域的样式 */
    .menu {
        .top{
            display: flex; /* 让路径导航部分横向排列 */
            margin-bottom: 20px; /* 底部间距 */
        }
        flex: 2; /* 左侧菜单占总宽度的 2/10 */
        display: flex;
        flex-direction: column; /* 垂直排列菜单项 */
        align-items: center; /* 让菜单项水平居中 */
    }

    /* 右侧内容区域的样式 */
    .content {
        flex: 8; /* 右侧内容区域占总宽度的 8/10 */
    }
}
</style>
