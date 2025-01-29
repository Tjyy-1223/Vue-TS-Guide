import { defineStore } from "pinia";

const useUserStore = defineStore('User', {
    state: () => {
        return {
            visiable: false,
        }
    },
    actions:{
        
    },
    getters:{

    }
})

export default useUserStore