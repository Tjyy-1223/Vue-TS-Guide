<template>
    <div>
        <!-- 首页轮播特结构 -->
        <Carousel></Carousel>
        <!-- 搜索框 -->
        <HomeSearch></HomeSearch>

        <!--  底部布局结构-->
        <el-row gutter="20">
            <el-col :span="20">
                <Level @getLevel="getLevel"/>
                <Region/>
                <!-- 展示医院的结构 -->
                <div class="hospital" v-if="1 > 0">
                    <Card v-for="item in 13" :key="item"></Card>
                    <!-- <Card v-for="(item, index) in hospitalArr" :key="index" :hospitalInfo="item"></Card> -->
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

// 引入组合式 API
import {onMounted, ref} from "vue"


// 加载组建完毕的时候发一次请求
onMounted(() => {
    getHospitalInfo();
})

// 分页器发生变化的时候进行一次请求
const currentChange = () => {
    getHospitalInfo();
}
//分页器下拉菜单的时候触发
const sizeChange = () => {
    // 同时将当前页设置为1
    pageNo.value = 1;
    getHospitalInfo();
}

let pageNo = ref<number>(1)
let pageSize = ref<number>(13)


// 获取医院已经有的数据
import type {Content} from "../../api/home/type"
let total = ref<number>(0)
let hospitalArr = ref<Content>([])
import { reqHospital } from '../../api/home' // 根据实际路径引入 reqHospital
const getHospitalInfo = async() => {
    // let result: any = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value);
    // if(result.code == 200){
    //     hospitalArr.value = result.data.content;
    //     total.value = result.data.totalElements;
    // }
}

// 存储医院的等级和地区
let hostype = ref<string>('')
let districtCode = ref<string>('')
// 从子组件收集参数
const getLevel = (level:string) => {
    hostype.value = level;
    getHospitalInfo();
}
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
