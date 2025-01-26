<template>
    <div class="tip">
        <!-- 常见科室模块 -->
        <div class="department">
            <div class="header">
                <!-- 左侧显示 '常见科室' 文本 -->
                <div class="left">
                    常见科室
                </div>
                <!-- 右侧显示 '全部' 文本，可能是点击展开更多科室的按钮 -->
                <div class="right">
                    全部
                </div>
            </div>
            <div class="content">
                <ul>
                    <!-- 列表项显示常见科室 -->
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                    <li>神经内科</li>
                </ul>
            </div>
        </div>

        <!-- 公共平台模块 -->
        <div class="notice">
            <div class="header">
                <!-- 左侧显示 '公共平台' 文本 -->
                <div class="left">
                    <span>公共平台</span>
                </div>
                <!-- 右侧显示 '全部' 文本，可能是点击查看所有通知的按钮 -->
                <div class="right">
                    <span>全部</span>
                </div>
            </div>
            <div class="content">
                <ul>
                    <!-- 列表项显示公共平台的通知 -->
                    <li>关于延长北京大学国际医科学院放假的通知</li>
                    <li>关于延长北京大学国际医科学院放假的通知</li>
                    <li>关于延长北京大学国际医科学院放假的通知</li> 
                </ul>
            </div>
         </div>

         <!-- 重要公告模块 -->
         <div class="notice">
            <div class="header">
                <!-- 左侧显示 '重要公告' 文本 -->
                <div class="left">
                    <span>重要公告</span>
                </div>
                <!-- 右侧显示 '全部' 文本，可能是点击查看所有公告的按钮 -->
                <div class="right">
                    <span>全部</span>
                </div>
            </div>
            <div class="content">
                <ul>
                    <!-- 列表项显示重要公告 -->
                    <li>关于今天医院停止门诊的公告</li>
                    <li>关于今天医院停止门诊的公告</li>
                    <li>关于今天医院停止门诊的公告</li>
                </ul>
            </div>
         </div>
    </div>
</template>

<script setup lang="ts">
// 目前没有额外的脚本逻辑，可以根据需要在这里添加
</script>

<style scoped lang="scss">
.tip{
    /* 外层容器的上边距和文字颜色 */
    margin-top: 40px;
    color: #7f7f7f;

    /* 常见科室模块样式 */
    .department{
        .header{
            /* 使用 Flexbox 实现左右布局 */
            display: flex;
            justify-content: space-between;
            .left{
                /* 左侧区域的样式 */
                display: flex;
                span{
                    /* 在左侧的 span 之间加入 5px 的左边距 */
                    margin-left: 5px;
                }
            }
        }
        .content{
            ul{
                /* 使用 Flexbox 使列表项水平排列，并允许换行 */
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    /* 每个列表项占据 40% 宽度，且之间有 20px 的垂直间距 */
                    width: 40%;
                    margin-top: 20px;
                }
            }
        }
    }

    /* 公共平台和重要公告模块的样式 */
    .notice{
        margin-top: 40px;
        .header{
            /* 使用 Flexbox 实现左右布局 */
            display: flex;
            justify-content: space-between;
        }
        .content{
            ul{
                li{
                    /* 单行文本溢出时显示省略号 */
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    /* 每个列表项的垂直间距 */
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
