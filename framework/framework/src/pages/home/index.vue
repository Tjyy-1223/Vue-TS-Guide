<template>
    <div>
        <!-- 首页轮播特结构 -->
        <Carousel></Carousel>
        <!-- 搜索框 -->
        <HomeSearch></HomeSearch>

        <!--  底部布局结构-->
        <el-row gutter="20">
            <el-col :span="20">
                <Level />
                <Region />
                <!-- 展示医院的结构 -->
                <div class="hospital">
                    <Card v-for="item in 13" :key="item"></Card>
                </div>
                <!-- 分页器容器 -->
                <div class="pagination-container">
                    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]" 
                        :size="size"
                        layout="sizes,prev,pager,next,->,total, jumper" 
                        :total="400" />
                </div>
            </el-col>
            <el-col :span="4">

            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 引入轮播图组件
import Carousel from './carousel/index.vue'
import HomeSearch from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'

// 分页需要的数据
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(13)
</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    /* 使卡片能够自动换行 */
    justify-content: space-between;
    /* 使每行的卡片平均分配 */
}

.hospital .el-card {
    width: 48%;
    /* 每行两个卡片，宽度设为 48% */
    margin-bottom: 20px;
    /* 卡片之间的间距 */
}

</style>
