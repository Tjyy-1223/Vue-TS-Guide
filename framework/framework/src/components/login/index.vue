<template>
    <!-- 登录容器 -->
    <div class="login_container">
        <!-- Element Plus 弹窗，v-model 双向绑定控制显示/隐藏 -->
        <el-dialog v-model="useStore.visiable" title="用户登录">
            <div class="content">
                <!-- 两列布局，左侧表单，右侧内容 -->
                <el-row>
                    <!-- 左侧：登录表单 -->
                    <el-col :span="12">
                        <div class="login">
                            <!-- 当 scene 值为 0 时显示手机号登录表单 -->
                            <div v-show="scene == 0">
                                <el-form>
                                    <!-- 手机号输入框 -->
                                    <el-form-item>
                                        <el-input placeholder="请你输入手机号码" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                                    </el-form-item>
                                    <!-- 验证码输入框 -->
                                    <el-form-item>
                                        <el-input placeholder="请你输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                                    </el-form-item>
                                    <!-- 获取验证码按钮 -->
                                    <el-form-item>
                                        <!-- 判断手机号是否有效和 flag 是否为真来控制按钮是否禁用 -->
                                        <el-button :disabled="!isPhone || flag ? true : false" @click="getCode">
                                            <!-- 倒计时组件或“获取验证码”文本 -->
                                            <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"></CountDown>
                                            <span v-else>获取验证码</span>
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                                <!-- 用户登录按钮 -->
                                <el-button style="width: 100%" type="primary" size="default" :disabled="!isPhone || loginParam.code.length < 6" @click="login">
                                    用户登录
                                </el-button>

                                <!-- 点击切换登录方式 -->
                                <div class="bottom" @click="changeScene">
                                    <p>微信扫码登录</p>
                                </div>
                            </div>

                            <!-- 当 scene 值为 1 时显示微信扫码登录结构 -->
                            <div class="webchat" v-show="scene == 1">
                                微信扫码登录的结构
                            </div>

                        </div>
                    </el-col>
                    <!-- 右侧：展示二维码信息 -->
                    <el-col :span="12">
                        <div class="leftContent">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/code_app.png" alt="">
                                    <p>微信扫一扫关注</p>
                                    <p>快速预约挂号</p>
                                </div>
                            </div>
                        </div>
                        <!-- 显示平台提示信息 -->
                        <p class="tip">官方指定平台</p>
                        <p class="tip">快速挂号 安全放心</p>
                    </el-col>
                </el-row>
            </div>

            <!-- 自定义弹窗底部按钮 -->
            <template #footer>
                <el-button type="primary" size="default">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 导入用户状态管理
import useUserStore from '../../store/modules/user';
let useStore = useUserStore();

// 导入 Element Plus 图标组件
import { User, Lock, Phone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

// 导入 Vue 相关功能
import { defineComponent, ref, reactive, computed } from 'vue';

// 定义组件名
defineComponent({
    name: 'Login'
});

// 定义 scene 状态，控制登录方式的显示（0：手机号登录，1：微信扫码登录）
let scene = ref<number>(0);

// 切换登录方式函数
const changeScene = () => {
    scene.value = 1;
}

// 手机表单数据，包含手机号和验证码
let loginParam = reactive({
    phone: '',
    code: ''
});

// 计算属性，判断手机号码是否符合正则格式
let isPhone = computed(() => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(loginParam.phone);
})

// 获取验证码的逻辑
const getCode = async () => {
    flag.value = true;
    loginParam.code = '123456'; // 模拟获取到的验证码
}

// 控制倒计时组件显示与隐藏
let flag = ref<boolean>(false);

// 倒计时组件控制器，父组件接收子组件传递的 flag 值来控制倒计时是否结束
const getFlag = (val : boolean) => {
    flag.value = val;
}

// 用户登录按钮设计
const login = () => {
    // 1. 登陆成功：顶部组件展示名字 + 对话框关闭
    // 2. 登陆失败： 弹出对应登陆失败的错误信息
    try{
        useStore.userLogin(loginParam);
        useStore.visiable = false;
    }catch(error){
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}
</script>

<style scoped lang="scss">
/* 自定义登录容器样式 */
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
}

/* 登录表单样式 */
.login {
    padding: 20px;
    border: 1px solid #ccc;
}

/* 底部微信扫码登录提示样式 */
.bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin: 10px 0px;
    }
}

/* 左侧内容样式，二维码提示图 */
.leftContent {
    .top {
        display: flex;
        justify-content: space-around;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 130px;
                height: 130px;
            }

            p {
                margin: 5px 0px;
            }
        }
    }
}

/* 显示平台和提示信息样式 */
.tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 900;
}
</style>
