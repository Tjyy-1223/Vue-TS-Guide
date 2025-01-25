<template>
    <div class="search">
        <el-autocomplete v-model="state" :fetch-suggestions="querySearch" popper-class="my-autocomplete"
            placeholder="Please input" @select="handleSelect">
        </el-autocomplete>

        <div class="button">
            <el-button type="primary" size="default" :icon="Search">搜索</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入 ep 提供的图标
import { Search } from "@element-plus/icons-vue"

</script>

<style scoped lang="scss">
.search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;

    .button {
        width: 100px;
    }
}
</style>