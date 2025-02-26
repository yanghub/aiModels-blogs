<template>
<!--    个人博客列表-->
    <div class="mcontaner">
        <Header></Header>
        <div class="block">
            <el-timeline >

                <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs" >
                    <el-card >
                        <h4>
                            <router-link :to="{name:'BlogDetail',params: {blogId: blog.id}}">
<!--                                此处绑定标签 :to跳转-->
                                {{blog.title}}
                            </router-link>
                        </h4>
                        <p>{{blog.description}}</p>
                    </el-card>
                </el-timeline-item>

                <el-pagination class="mpage"
                        background
                        layout="prev, pager, next"
                               :current-page="currentPage"
                               :page-size="pagesize"
                               :total="total"
                               @current-change=page>
<!--                     @current-change=page绑定事件-->
                </el-pagination>

            </el-timeline>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    export default {
        name: "Biogs.vue",
        components: {Header},
        data() {
            //返回的信息
            return{
                blogs: {},
                currentPage: 1 , //当前页
                total: 0,    //总页数
                pagesize: 5 , //每页数量
                ownBlog: false,
            }
        },
        methods: {
            page(currentPage){
                const userid =this.$store.getters.getUser.id;
                const  _this = this;

                _this.$axios.get("/userblog/"+userid+"?currentPage="+currentPage).then(res =>{
                    console.log(res);
                    _this.blogs =res.data.data.records ;//赋值
                    _this.currentPage =res.data.data.current;
                    _this.total =res.data.data.total;
                    _this.pagesize =res.data.data.size;
                    _this.ownBlog=(blog.userid === _this.$store.getters.getUser.id);
                })
            }
        },
        created() {
            //此方法页面渲染就调用
            this.page(1)
        }
    }
</script>

<style scoped>
    .mpage{
        margin: 0 auto;
        text-align: center;
    }

</style>