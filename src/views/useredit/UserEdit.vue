<template>
    <div>
        <Header></Header>
        修改用户信息
        <div>{{imageUrl}}</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" >
            <el-form-item label="头像" prop="avatar">
                <el-upload
                        action="doUpload"
                        list-type="picture-card"
                        :limit="1"
                        :auto-upload="true"
                        :before-upload="beforeUploadForm"
                        :http-request="imageChange"
                >
                    <div>上传图片</div>
                </el-upload>

            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.username" readOnly></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="ruleForm.region"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="ruleForm.type"></el-input>
            </el-form-item>
            <el-form-item label="签名" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
<!--                <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
    import Header from "../../components/Header";
    export default {
        name: "UserEdit",
        components: {Header},
        data() {
            return {
                imageUrl: 'url绑定数据测试',
                labelPosition: 'right',
                ruleForm: {
                    id:'',
                    uid:'',
                    avatar:'',
                    username:'123',
                    name: 'xiaoyang',
                    region: '',
                    type: [],
                    desc: ''
                },

            };
        },
        methods: {
            beforeUploadForm (file) {
                // 验证文件类型
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'PNG' || testmsg === 'gif'
                const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				// 	this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				
                if (!extension) {
                    this.$message({
                        message: '上传文件只能是jpg/png/gif格式!',
                        duration: 1000,
                        showClose: true,
                        type: 'warning'
                    })
                }else if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
                return extension && isLt2M
            },

            // 提交图片
            imageChange(param,type){
                console.log(param);
                console.log(param.file.name);  //获取上传文件名
                const _this=this;
                console.log("----")
                let formData = new FormData()
                formData.append('fileName', param.file.name)
                console.log(formData.get('fileName'))
                // formData.append('file', param.file);
                // formData.append("fileId", filename)// 额外参数
                console.log(formData)
                // this.imageUrl = URL.createObjectURL(param.file.raw);
                this.imageUrl=param.file.name;
                console.log(this.imageUrl);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        // 'enctype' :"multipart/form-data"
                    }
                };
                _this.$axios.post('/pictureinfo/edit',this.imageUrl,config).then(res => {
                    console.log(res);
                    console.log("url-----");
                    console.log(res.data.data);  //获取data-url
                    _this.imageUrl=res.data.data;
                    _this.$axios.post('')
                    if (res.IsSuccess) {
                        this.imgList.push(res.Data.Data)
                    }
                });
                console.log(this.imgList);
            },
            // 文件上传成功时的钩子
            handleAvatarSuccess(res, file){
				this.imageUrl = URL.createObjectURL(file.raw);
				console.log(file)
			},
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const _this = this
                    this.$axios.post("/userinfo/edit",this.ruleForm,{
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then(res =>{
                        console.log(res);
                        console.log(this.$store.getters.getUser.id);
                        _this.$alert('发布成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$router.push("/blogs")
                            }
                        });
                    })
                } else {

                    console.log(this.$store.getters.getUser.id)
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        created(){
            //编辑时回显
            // const userInfoId =this.$route.params;
            // console.log("userInfoId是"+ res.data.data);  //拿到id
            //
            // const _this = this;
            // if (this.$store.getters.getUser.id){
            //     const  _this = this
            //     const userInfo= res.data.data;
            //     const userId=this.$store.getters.getUser.id
            //     console.log("本人用户id:"+this.$store.getters.getUser.id)
            //     this.$axios.get("/info/"+userId).then(res =>{
            //         _this.ruleForm.username=userInfo.username
            //         console.log( "昵称"+_this.ruleForm.username)
            //         // _this.blogs =res.data.data.records //赋值
            //     })
            // }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
