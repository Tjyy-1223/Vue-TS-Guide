<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <!-- 卡片：展示就诊人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
                </div>
            </template>
            <!-- 就诊人卡片组件 -->
            <div class="user">
                <visitor v-for="item in 4" :key="item" class="item"></visitor>
            </div>
        </el-card>

        <!-- 卡片：展示医生信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 详细表格信息 -->
            <el-descriptions class="margin-top" title="With border" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            Username
                        </div>
                    </template>
                    kooriookami
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <iphone />
                            </el-icon>
                            Telephone
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <location />
                            </el-icon>
                            Place
                        </div>
                    </template>
                    Suzhou
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <tickets />
                            </el-icon>
                            Remarks
                        </div>
                    </template>
                    <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <office-building />
                            </el-icon>
                            Address
                        </div>
                    </template>
                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </el-descriptions-item>
            </el-descriptions>
            <!-- 确认挂号按钮 -->
             <div class="btn">
                <el-button type="primary" size="default">确认挂号</el-button>
             </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import visitor from './visitor.vue';
import { computed, ref } from 'vue'
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .box-card {
        margin: 20px 0px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 5px;
            }
        }
    }

    .btn{
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
}
</style>