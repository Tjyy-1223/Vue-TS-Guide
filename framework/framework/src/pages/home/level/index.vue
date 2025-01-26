<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级</div>
            <ui class="hospital">
                <li :class="{ active: activeFlag == '' }">三甲医院</li>

                <li v-for="(level, index) in [1, 2, 3, 4]" :class="{active:activeFlag==level}"  :key="index" @click="changeLevel(level)">
                    三级甲等
                </li>
                <!-- <li v-for="level in levelArr" :key="level.value">{{level.name}}</li> -->
            </ui>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 控制点击谁谁高亮
let activeFlag = ref<string>('')
const changeLevel = (level:string) => {
    console.log(level);
    activeFlag.value = level;
    $emit('getLevel', level);
}
// 点击时候触发父组件方法
let $emit = defineEmits(['getLevel']);
</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f;

    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }

    .content {
        display: flex;

        .left {
            margin-right: 10px;
        }

        .hospital {
            list-style-type: none;
            display: flex;

            li {
                margin-right: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
            }
        }
    }
}
</style>