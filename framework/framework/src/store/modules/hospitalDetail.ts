// 导入 Pinia 中的 `defineStore` 函数
import { defineStore } from "pinia"

// Pinia 仓库的定义，`defineStore` 用于定义一个新的 store（仓库）
const useDetailStore = defineStore('Detail', {
    
    // `state` 用于定义 store 中的状态，这里的 `state` 返回一个空对象
    state: () => {
        return {
            hospitalInfo: {}
        }  // 目前状态为空对象，通常在此处会定义需要管理的状态
    },
    
    // `actions` 用于定义修改状态的方法，可以在这里添加各种方法来操作 store 中的状态
    actions: {
        // actions 内可以添加方法，例如：
        // async fetchData() { /* 异步操作 */ }
        async getHospital(hoscode: any){
            
        }
    },
    
    // `getters` 用于定义基于 state 派生出来的计算属性，类似 Vue 组件中的计算属性
    getters: {
        // getters 示例：
        // fullName: (state) => state.firstName + ' ' + state.lastName
    }
})

// 将该 store 对外暴露，外部可以通过 `useDetailStore()` 来使用该仓库
export default useDetailStore
