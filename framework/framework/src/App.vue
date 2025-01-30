<template>
  <div class="container">
      <!-- 顶部全局组件 -->
       <FrameworkTop/>

       <!-- 展示路由组件的区域 -->
        <div class="content">
          <!-- 展示路由组件 -->
           <router-view></router-view>
        </div>

        <!-- 底部 -->
         <FrameworkBottom/>

         <!-- 全局登陆组件 -->
          <Login v-if="userStore.visiable"/>
  </div>
</template>

<script setup lang="ts">
import useUserStore from './store/modules/user';
let userStore = useUserStore();

</script>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
      margin-top: 70px;
      width: 1200px;
      min-height: 700px;
    }

    .bottom{
      width: 100%;
      height: 50px;
      background:grey
    }
  }
</style>