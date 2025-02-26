<template>
<!--    博客详情页-->
    <div>
        <Header></Header>
        <div class="mbog">
            <h2>{{ blog.title }}</h2>
            <div class="leftjoin">
                <el-link icon="el-icon-edit" v-if="ownBlog">
                    <router-link :to="{name: 'BlogEdit',params:{blogId: blog.id}}">
                        编辑
                    </router-link>
                </el-link>
                <el-link icon="el-icon-delete-solid" @click="delopen" v-if="delownBlog">
<!--                    <router-link :to="{name: 'Blogs',params:{blogId: blog.id}}">-->
<!--                        删除-->
<!--                    </router-link>-->
                    删除
                </el-link>
            </div>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
    import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
    import Header from "../components/Header";
    export default {
        name: "BlogDetail",
        components: {
            // VueMarkdown,
            Header
        },
        data(){
            return{
                blog:{
                    id:"",
                    title:"",
                    content:""
                },
                ownBlog: false,  //默认隐藏编辑按钮
                delownBlog: false
            }
        },
        created() {
            const blogId =this.$route.params.blogId;
            // console.log(blogId);  //拿到id

            const _this = this;
            this.$axios.get("/blog/"+blogId).then(res =>{
                const blog= res.data.data;
                _this.blog.id = blog.id;
                _this.blog.title = blog.title;
                //渲染MarkdownIt
                var MarkdownIt = require("markdown-it");
                var md =new MarkdownIt();
                var result =md.render(blog.content);
                _this.blog.content = result;
                // console.log("检测id")
                // console.log(blog.userid)
                // console.log("检测路由id")
                // console.log(_this.$store.getters.getUser.id)
                _this.ownBlog=(blog.userid === _this.$store.getters.getUser.id)   //获取id为自己的文章则显示编辑
                _this.delownBlog=(blog.userid === _this.$store.getters.getUser.id)   //获取id为自己的文章才可删除
            });

        },
        methods: {
            delopen() {
                const blogId =this.$route.params.blogId;
                // console.log(blogId);  //拿到id
                const _this = this;
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete("/deleteblogById/"+blogId).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .mbog{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        min-height: 700px;
        padding: 20px 15px;
    }
    .leftjoin{

    }

</style>