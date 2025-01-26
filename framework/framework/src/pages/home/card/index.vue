<template>
    <el-card class="box-card" shadow="hover" @click="goDetail()">
        <div class="content">
            <div class="left">
                <div class="hospital_name">
                    北京医院
                </div>
                <!-- <div class="hospital_name">
                    {{hospitalInfo.hostname}}
                </div> -->
                <div class="tip">
                    <div class="level">三级甲等</div>
                    <div class="time">2023</div>
                </div>
            </div>
            <div class="right">
                <img src="../../../assets/vue.svg">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
// 接受父组件属性
// let props =  defineProps(['hospitalInfo']);

// 点击医院卡片
import { useRouter } from 'vue-router';
let $router = useRouter();
const goDetail = () => {
    $router.push({path: '/hospital'})
}

</script>

<style scoped lang="scss"> 
.content{
    display: flex;
    justify-content: space-between;
    .right{
        img{
            width: 50px;
            height: 50px;
        }
    }
    .left{
        width: 60%;
        .tip{
            color: #7f7f7f;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .level{
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>