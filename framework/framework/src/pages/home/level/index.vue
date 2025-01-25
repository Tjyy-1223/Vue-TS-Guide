<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级</div>
            <ui class="hospital">
                <li>三甲医院</li>
                <li>三甲医院</li>
                <li>三甲医院</li>
                <li>三甲医院</li>
                <li>三甲医院</li>
            </ui>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f; 
    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }

    .content {
        display: flex;

        .left {
            margin-right: 10px;
        }

        .hospital {
            list-style-type: none;
            display: flex;

            li {
                margin-right: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
            }
        }
    }
}
</style>