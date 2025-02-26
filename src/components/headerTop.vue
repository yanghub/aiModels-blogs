<template>
    <div>

        <ul>
            <li><a href="/">主页</a></li>
            <li><a @click="nullGo">Flying</a></li>
            <li><a href="/blogs">博客</a></li>
            <li style="float:right">
                <div class="active">
                    <div class="block" v-for="item in imagesBox" :key="item.id">
                        <el-tooltip class="item" effect="light" content="个人信息" placement="bottom-end">
                            <router-link to="/useredit/add" >
                                <el-avatar :size="40" :src="user.avatar"
                                           :preview-src-list="srcList">
                                </el-avatar>
                            </router-link>
                        </el-tooltip>
                    </div>


                </div>
            </li>
            <li >
<!--                <div class="dropdown">-->
<!--                    <button class="dropbtn">Dropdown</button>-->
<!--                    <div class="dropdown-content">-->
<!--                        <a href="#">Link 1</a>-->
<!--                        <a href="#">Link 2</a>-->
<!--                        <a href="#">Link 3</a>-->
<!--                    </div>-->
<!--                </div>-->
                <el-dropdown @command="handleCommand">
                     <span class="el-dropdown-link">
<!--                         <router-link to="/useredit/add" >-->

<!--                             -->
<!--                         </router-link>-->
                         <a @click="msg">
                         <span
                                 class="code"
                                 :style="{'color':codeColor}"
                                 @click="randomColor"
                         >{{ user.username }}</span>
                         </a>

                         <i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                    <el-dropdown-menu slot="dropdown">
<!--                        <el-dropdown-item command="a">-->
<!--                            <span>ss</span>-->

<!--                        </el-dropdown-item>-->
                        <el-dropdown-item command="b">
                            <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>
                            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </li>

        </ul>
    </div>

</template>

<script>
    export default {
        name: "HeaderTop",
        data(){
            return{
                userInfo:{},
                onefor: {
                    id:'',
                    userid:'',
                    title: '',
                    description: '',
                    content: 'dd',
                    status:'1'
                },
                user: {
                    username: '请先登录!',  //默认值
                    avatar: require("../assets/img/avatarno.png"),  //必须加require("")
                    // avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                    // circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                },
                imagesBox:[ //头像
                    {id:0,idView:require("../assets/img/avatarno.png")},
                    // {id:1,idView:require("../assets/img/index/index102.jpg")},
                    // {id:2,idView:require("../assets/img/index/index103.jpg")},
                    // {id:3,idView:require("../../assets/4.jpg")},
                ],
                fiveNews: [],  //头像存放
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ],
                hasLogin: false,    //默认还没有登录
                codeColor: "#E6A23C"
            }
        },
        methods: {
            onemy(){
                const  _this = this;
                _this.$axios.get("https://v2.jinrishici.com/sentence",{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res =>{
                    console.log("ccc")
                    console.log(res.data.data)
                    _this.onefor =res.data.data.records //赋值

                })
            },

            logout(){
                // alert(11)
                //删除信息就可以，不需要请求后端
                const _this = this
                _this.$axios.get("/logout",{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res =>{
                    // alert(112)
                    _this.$store.commit("REMOVE_INFO")  //清除信息
                    _this.$router.push("/login")   //跳回登录页面
                })
            },
            handleCommand(command) {
                // 获取点击下拉列表字段的点击时间
                // this.$message('click on item ' + command);
            },
            msg(){

                // const jinrishici = require('jinrishici');
                // jinrishici.load(result => {
                //     console.log(result);
                //     this.$message(result.data.content);
                //     // this.$message(result.data.content+"—— "+result.data.origin.author);
                //     console.log(result.data.content)
                // });
                // this.$message({
                //     dangerouslyUseHTMLString: true,
                //     message: '<img alt="每日推荐" src="https://v2.jinrishici.com/one.svg">'
                // });

            },
            nullGo() {
                this.$message({
                    message: '模块建设中，敬请期待',
                    center: true
                });
                // this.$message('模块建设中，敬请期待');
            }
        },
        created() {
            this.onemy();
            //页面创建就会调用此方法
            console.log("用户名:"+this.$store.getters.getUser.username); //获取用户名
            if(this.$store.getters.getUser.username){
                this.user.username=this.$store.getters.getUser.username;
                this.user.avatar=this.$store.getters.getUser.avatar; //头像
                this.imagesBox.idView=this.$store.getters.getUser.avatar; //头像，此方式不能返回前
                //信息不为空才显示登录按钮
                this.hasLogin =true

            }
            //信息创建
            if (this.$store.getters.getUser.id!=null){
                const  _this = this
                const userId=this.$store.getters.getUser.id
                console.log("用户id:"+this.$store.getters.getUser.id)
                this.$axios.get("/info/"+userId).then(res =>{
                    console.log("信息测试--XX")
                    console.log(res.data.data)
                    console.log("信息测试--XX")
                    _this.userInfo=res.data.data;
                    // console.log( "用户名："+this.$store.getters.getUser.username)
                    // _this.blogs =res.data.data.records //赋值
                    if (res.data.data===null){// 需解决请求头问题
                        console.log( "用户名---："+this.$store.getters.getUser.username)
                        this.$axios.post("/userinfo/edit",this.$store.getters.getUser.username,{
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                            }
                        }).then(res =>{
                            console.log(res);
                        })
                    }
                })
            }

        },
        randomColor() {
            let R = Math.floor(Math.random() * 255);
            let G = Math.floor(Math.random() * 255);
            let B = Math.floor(Math.random() * 255);
            console.log("rgb(" + R + "," + G + "," + B + ")");
            this.codeColor = "rgb(" + R + "," + G + "," + B + ")";
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #f3f4f6;
        height: 50px;
    }

    li {
        float: left;
    }

    li a {
        /*display: block;*/
        color: rgb(107 154 141 );
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        /*height: 40px;*/
    }

    li a:hover:not(.active) {
        background-color: #d3dce6;
    }

    .active {
        margin-top: 5px;
        /*background-color: #b7b7b7;*/
    }

    .m-content{
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }
    .maction {
        margin: 10px 0;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>