<template>
  <div class="container">
      <!-- 顶部全局组件 -->
       <FrameworkTop/>

       <!-- 展示路由组件的区域 -->
        <div class="content">
          xxxxx
        </div>

        <!-- 底部 -->
         <FrameworkBottom/>
  </div>
</template>

<script setup lang="ts">

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