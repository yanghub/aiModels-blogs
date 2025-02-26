<template>
<!--    登录-->
    <div>
        <el-container>
            <el-header>
                <router-link to="/">
                   <el-image :src="user.login"
                        style="width: 100px; height: 60px" />
                 </router-link>
<!--               width: 60px; height: 60px; margin-top: 1px;-->
            </el-header>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button type="primary"  @click="clidialog()">注册</el-button>
<!--                        disabled禁用状态-->
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>

                </el-form>
            </el-main>
        </el-container>
        <div>
<!--            :visible.sync绑定dialogVisible-->
            <el-dialog title="欢迎注册" :visible.sync="dialogVisible" width="400px">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入3位以上用户名" v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" autocomplete="off" v-model="ruleForm.password" show-password></el-input>
<!--                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>-->
                    </el-form-item>
<!--                    <el-form-item label="确认密码" prop="checkPass">-->
<!--                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
<!--                    </el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="register('ruleForm')">注 册</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user:{
                    //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599071326370&di=7385969d3fc4044e9c2c4185cae75076&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7da8a4b523d1ed039fa8f0d33caaa8d97c3a297a552da-ZEtFgG_fw658
                    login: require("../assets/img/gif/login.gif"),
                },
                dialogVisible:false,
                dialogSuss:"",
                ruleForm: {
                    username: '',
                    password: '',
                    checkPass: '',
                    email: ''
                },
                regisForm: {  //注册
                    username: '',
                    password: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    // password: [
                    //     { required: true, message: '请输入密码', trigger: 'change' }
                    // ],
                    password: [
                        { validator: validatePass,required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this //预存this
                        this.$axios.post('/login',this.ruleForm,this.resetForm.username).then(res =>{

                            // console.log(res.headers)
                            // console.log(res)
                            const jwt=res.headers['authorization']
                            const userInfo=res.data.data
                            // console.log(userInfo)
                            _this.$store.commit("SET_TOKEN",jwt)
                            _this.$store.commit("SET_USERINFO",userInfo)
                            //获取信息
                            console.log(_this.$store.getters.getUser)

                            _this.$router.push("/")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            clidialog(){
                console.log("dianji");
                this.dialogVisible = true
            },
            register(regis) {
                // 注册
                console.log(regis);
                this.$refs[regis].validate((valid) => {
                    console.log(regis);
                    console.log(valid);
                    if (valid) {
                        const _this = this
                        this.$axios.post("/save",this.ruleForm).then(res =>{
                            // window.location.reload();   //刷新操作
                            this.dialogVisible=false;
                            // this.$message({message: '注册成功!',type: 'success'});
                            // this.dialogSuss="savedia"
                            console.log(res);
                            console.log(this.dialogVisible);
                        })
                    } else {
                        console.log('error submit!!');
                        this.$message({message: '连接失败/用户名密码未输入',type: 'error' });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const username =this.$route.params.username;
            console.log("username")
            console.log(username)
            console.log(this.ruleForm.username)
        }

    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .mlogo {
        height: 30%;
        margin-top: 5px;
    }
    .demo-ruleForm{
        max-width: 500px;
        margin: 0 auto;
    }
</style>
