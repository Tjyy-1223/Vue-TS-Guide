<template>
    <div @click="enter">
        预约挂号
    </div>
</template>

<script setup lang="ts">
// 跳转到详情页面
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
let $route = useRoute();
const enter = () =>{
    $router.push({path: './register_step1'})
}
</script>

<style scoped>

</style>