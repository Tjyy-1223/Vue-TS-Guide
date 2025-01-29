<template>
    <div>
        <span>获取验证码[{{time}}]s</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';  // 导入 Vue 的 ref 和 watch API

// 倒计时的初始时间设置为 5 秒
let time = ref<number>(5);

// 接收父组件传递的 `flag` prop，决定倒计时是否开始
let props = defineProps(['flag']);

// 子组件通过 `$emit` 发送事件，通知父组件倒计时结束
let $emit = defineEmits(['getFlag']);

// 使用 `watch` 监听 `flag` 的变化，当 `flag` 变为 `true` 时开始倒计时
watch(
    () => props.flag,  // 监听父组件传递的 `flag` 属性
    () => {
        // 设置定时器，每秒更新一次 `time`，模拟倒计时
        let timer = setInterval(() => {
            time.value--;  // 每次倒计时减 1 秒
            if (time.value == 0) {  // 如果倒计时到 0，清除定时器
                // 向父组件发送事件，通知倒计时结束
                $emit('getFlag', false);  // 通知父组件 `getFlag` 为 `false`，表示倒计时结束
                clearInterval(timer);  // 清除定时器
            }
        }, 1000);  // 每 1000 毫秒（即 1 秒）执行一次

    },
    {
        immediate: true,  // 立即触发一次监听函数（确保一开始就开始倒计时）
    }
)
</script>


<style scoped>

</style>