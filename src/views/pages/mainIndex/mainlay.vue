<template>
    <div>
        内容居中a
    </div>
</template>

<script>
    export default {
        name: "mainlay",
        data(){
            return {
                //    数据绑定
                name:""
            }
        },
        beforeCreate() {
            console.log('创建之前');
        },
        created() {
            console.log('创建之后');
        },
        beforeMount() {
            console.log('渲染之前');
        },
        mounted() {
            console.log('渲染之后');
        },
        beforeUpdate() {
            console.log('更新之前');
        },
        updated() {
            console.log('更新之后');
        },
        beforeDestroy() {
            console.log('销毁之前');
        },
        destroyed() {
            console.log('销毁之后');
        }
    }
</script>

<style scoped>

</style>