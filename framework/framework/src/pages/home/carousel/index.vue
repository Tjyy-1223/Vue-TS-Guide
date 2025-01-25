<template>
    <el-carousel height="350px">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../../assets/banner1.jpeg" alt="">
            </el-carousel-item>
        </el-carousel>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    img{
        width: 100%;
        height: 35;
    }
</style>