<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">北京xx医院</div>
            <div class="line"></div>
            <div>专科</div>
            <div class="dot">.</div>
            <div class="hosdepartment">多发性硬化专科门诊</div>
        </div>

        <div class="center">
            <h1>2023年6月3日</h1>
            <div class="container">
                <div class="item" v-for="item in 6" :key="item">
                    <div class="top1">123</div>
                    <div class="bottom">456</div>
                </div>
                
            </div>
            <div class="date" @click="goStep2">预约挂号 - 就诊人</div>
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
let $route = useRoute();
const goStep2 = () =>{
    $router.push({path: './register_step2'})
}
</script>

<style scoped lang="scss">
.wrap{
    .top{
        display: flex;
        color: #7f7f7f;
        .line{
            width: 5px;
            height: 20px;
            background: skyblue;
            margin: 0px 5px;
        }

        .dot{
            margin: 0px 5px;
            color: skyblue;
        }
    }

    .center{
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .time{
            font-weight: 900;
        }

        .container{
            width: 100%;
            display: flex;
            margin: 50px 0px;
            .item{
                flex: 1;
                border: 1px solid skyblue;
                margin: 0px 5px;
                flex-direction: column;
                align-items: center;
                .top1{
                    background: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }

        .date{
            margin-bottom: 10px;
        }
    }
}
</style>