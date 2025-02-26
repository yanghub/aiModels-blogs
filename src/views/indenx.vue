<template>
        <div>
            <div class="headerq">
                <HeaderTop></HeaderTop>
            </div>
            <div class="main">
                <Body></Body>
            </div>

        </div>
</template>

<script>
    // import HeaderTop from "../components/HeaderTop";
    import Body from "./main/body";
    import HeaderTop from "../components/headerTop";
    export default {
        name: "index",
        components: {HeaderTop, Body}
    }
</script>

<style scoped>

    /*.t-center{*/
    /*    text-align:center*/
    /*}*/
    /* 头部样式 */
    .headerq {
        position: absolute;
        line-height: 50px;
        top: 0px;
        left: 0px;
        right: 0px;
        background-color: #f5f6f7;
    }

    /* 左侧样式 */
    .navbar {
        position: absolute;
        width: 200px;
        top: 50px;  /* 距离上面50像素 */
        left: 0px;
        bottom: 0px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
        background-color: #545c64;
    }

    /* 主区域 */
    .main {
        position: absolute;
        top: 50px;
        left: 0px;
        bottom: 0px;
        right: 0px;  /* 距离右边0像素 */
    }
    padding: 10px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    /*background-color: red;*/



    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
</style>


<!--<template>-->

<!--    <div>-->
<!--        <div class="headerq">-->
<!--            <HeaderTop></HeaderTop>-->
<!--        </div>-->
<!--        <div class="main">-->
<!--            <div class="t-center">内容居中 </div>-->
<!--        </div>-->

<!--    </div>-->


<!--</template>-->

<!--<script>-->
<!--    // import Header from "../components/Header";-->
<!--    import HeaderTop from "../components/headerTop";-->
<!--    import Header from "../components/Header";-->

<!--    export default {-->
<!--        name: "indenx",-->
<!--        components: {HeaderTop, Header},-->
<!--        data() {-->

<!--        },-->
<!--        methods: {-->

<!--        },-->
<!--        created() {-->

<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->





<!--</style>-->


