<template>
    <div class="user">
        <!-- 左侧导航 -->
        <!-- 左侧菜单区域 -->
        <div class="menu">
            <!-- 顶部的路径导航，显示当前所在的页面路径 -->
            <div class="top">
                <!-- 使用 Element Plus 提供的 HomeFilled 图标 -->
                <el-icon><HomeFilled/></el-icon>
                <!-- 显示当前页面路径，路径是“/ 医院详情信息” -->
                <p>/ 会员中心</p>
            </div>

            <!-- Element Plus 的菜单组件 -->
            <!-- :default-active="..." 表示根据当前路径自动选中对应的菜单项 -->
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                
                <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
                    <!-- 使用 Element Plus 提供的图标 -->
                    <el-icon><icon-menu /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>

                <el-menu-item index="/user/order" @click="changeActive('/user/order')">
                    <el-icon><document /></el-icon>
                    <span>挂号订单</span>
                </el-menu-item>

                <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
                    <el-icon><setting /></el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>

                <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
                    <el-icon><InfoFilled /></el-icon>
                    <span>账号信息</span>
                </el-menu-item>

                <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
                    <el-icon><Search /></el-icon>
                    <span>意见返回</span>
                </el-menu-item>

            </el-menu>
        </div>
        <!-- 右侧内容 -->
        <div class="content">
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

</script>

<style scoped lang="scss">
.user{
    display: flex;
    .menu{
        flex: 2;
    }
    .content{
        flex: 8;
    }
}
</style>