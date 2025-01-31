<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">医保</span>
                <span class="username">贾成豪</span>
            </div>

            <div class="right">
                <el-button circle type="primary" size="default" :icon="Edit"></el-button>
            </div>
            
        </div>
        <div class="bottom">
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
            <p>证件类型：身份证</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';


</script>

<style scoped lang="scss">
.visitor{
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
    .top{
        height: 60px;
        background: #e5e5e5;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .left{
            .free{
                background: white;
                padding: 5px;
                font-size: 12px;
                margin-right: 10px;
                border-radius: 10px;
            }
            .username{
                color: #7f7f7f;
            }
        }
    }

    .bottom{
        padding: 10px;
        p{
            line-height: 30px;
        }
    }
}
</style>