<template>
    <div class="top">
        <div class="content">
            <!-- 左侧 -->
             <div class="left" @click="goHome">
                <img src="../../assets/vue.svg" alt="">
                <p>框架 - 统一管理平台</p>
             </div>
             <!-- 右侧 -->
             <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="login">注册/登陆</p>
             </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '../../store/modules/user';
let userStore = useUserStore();
let $router = useRouter();
const goHome = () => {
    $router.push({path: '/home'})
}

const login = () => {
    userStore.visiable = true
}
</script>

<style scoped lang="scss">
.top{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    .content{
        width: 1200px;
        height: 70px;
        background: white;
        // 元素一左一右
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
            p{
                font-size: 20px;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14;
            color: #bbb;
            .help{
                margin-right: 10px;
            }
        }
    }
}
</style>