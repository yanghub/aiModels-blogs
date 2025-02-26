<template>
<!--    编辑博客-->
    <div>
        <Header></Header>

        <div class="m-content">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-switch
                        class="left"
                        v-model="ruleForm.status"
                        active-text="公开"
                        inactive-text="私密"
                        active-value="1"
                        inactive-value="0">
                </el-switch>
                <el-form-item>
<!--                    <el-input v-model="ruleForm.status"></el-input>-->
                </el-form-item>

                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="ruleForm.content"></mavon-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "BlogEdit",
        components: {Header},
        data() {
            return {
                ruleForm: {
                    // value1: '1',
                    id:'',
                    userid:'',
                    title: '',
                    description: '',
                    content: '',
                    status:'1'
                },
                rules: {
                    status: [
                        { required: true, message: '请输入标记', trigger: 'blur' },
                        { min: 0, max: 1, message: '标记0或1，只有一位', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入摘要', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容',trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.$axios.post("/blog/edit",this.ruleForm,{
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res =>{
                            console.log(res)
                            _this.$alert('发布成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/blogs")
                                }
                            });
                        })
                    } else {
                        if (this.$store.getters.getUser.id!=null){
                            this.$alert('请填写完整内容后再提交吧！', '内容不完整', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `写一篇博客吧`
                                    });
                                }
                            });
                        }else {
                            this.$alert('请登录后再试！', '未登录', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `登录试试吧`
                                    });
                                }
                            });
                        }

                        console.log(this.$store.getters.getUser.id)
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            //回显
            //编辑时回显
            const blogId =this.$route.params.blogId;
            console.log(blogId);  //拿到id

            const _this = this;
            if(blogId){
                this.$axios.get("/blog/"+blogId).then(res =>{
                    const blog= res.data.data;
                    // console.log(blog.userid);   //拿到userid
                    _this.ruleForm.userid=blog.userid;
                    console.log("xxx");
                    console.log(_this.ruleForm.userid);
                    _this.ruleForm.id = blog.id;
                    _this.ruleForm.status = blog.status;   //测试状态0或1
                    _this.ruleForm.title = blog.title;
                    _this.ruleForm.description = blog.description;
                    _this.ruleForm.content = blog.content;

                })
            }
        }
    }
</script>

<style scoped>
.m-content{
    text-align: center;
}
</style>
