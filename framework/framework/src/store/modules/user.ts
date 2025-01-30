import { defineStore } from "pinia";  // 导入 Pinia 中定义 store 的方法

// 定义一个名为 'User' 的 Pinia store
const useUserStore = defineStore('User', {
    // state 用于定义 store 中的状态
    state: () => {
        return {
            visiable: false,  // 控制用户登录窗口的显示与隐藏
            userInfo: JSON.parse(localStorage.getItem('USERINFO') as string) || {}  // 获取本地存储中的用户信息，如果没有则返回一个空对象
        }
    },
    
    // actions 用于定义修改状态的逻辑方法
    actions: {
        // userLogin 方法用于处理用户登录逻辑
        async userLogin(loginData: any) {
            // 如果验证码是 '123456'，则登录成功
            if (loginData.code == '123456') {
                // 模拟登录成功，设置用户信息
                this.userInfo = {
                    name: "tjyy",  // 假设登录成功的用户姓名为 'tjyy'
                    token: "tjyy1234"  // 假设登录成功后返回的 token
                }
                // 将用户信息存储到本地存储中，方便下次访问
                localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                return 'ok';  // 登录成功返回 'ok'
            } else {
                // 如果验证码错误，返回一个拒绝的 Promise
                return Promise.reject(new Error("incorrect code"));
            }
        },

        logout(){
            this.userInfo = {name: '', token: ''};
            localStorage.removeItem('USERINFO');
        }
    },
    
    // getters 用于获取状态的计算属性，当前为空
    getters: {

    }
})

// 导出 useUserStore，用于在组件中使用这个 store
export default useUserStore;
