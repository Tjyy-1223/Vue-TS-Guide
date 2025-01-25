<template>
    <div class="region">
        <div class="content">
            <div class="left">地区</div>
            <ui>
                <li>全部</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li v-for="item in 10" :key="item">昌平区</li>
            </ui>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 0px;
            width: 45px;
        }
        ui{
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 5px;
                margin-bottom: 5px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
            }
        }
    }
}
</style>