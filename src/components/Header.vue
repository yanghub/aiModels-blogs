<template>
    <div class="m-content">

<!--        <el-aside>-->
<!--            <h3 calss="mainvg"-->
<!--                :style="{'color':'#909399'}"-->
<!--            >诗词{{onefor.content}}</h3>-->
<!--        </el-aside>-->
<!--        <div class="block" v-for="item in imagesBox" :key="item.id">-->
<!--&lt;!&ndash;            style="width: 100px; height: 100px"&ndash;&gt;-->
<!--            <div >-->
<!--                <router-link to="/useredit/add" >-->
<!--                    <el-avatar :size="50" :src="user.avatar"-->
<!--                               :preview-src-list="srcList">-->
<!--                    </el-avatar>-->
<!--                </router-link>-->

<!--            </div>-->

<!--&lt;!&ndash;            <el-image :src="require('@src/views/img/avatarno.png')" />&ndash;&gt;-->
<!--            <div>-->
<!--                <el-tooltip class="item" effect="dark" content="个人信息" placement="right">-->
<!--                    <router-link to="/useredit/add" >-->
<!--                        <span-->
<!--                                class="code"-->
<!--                                :style="{'color':codeColor}"-->
<!--                                @click="randomColor"-->
<!--                        >{{ user.username }}</span>-->
<!--                    </router-link>-->
<!--                </el-tooltip>-->

<!--            </div>-->
<!--        </div>-->

        <div class="maction">
            <span><el-link href="/">返回主页</el-link></span>
            <el-divider direction="vertical"></el-divider>

            <span><el-link href="/blogs">全部文章</el-link></span>
            <el-divider direction="vertical"></el-divider>

            <span><el-link href="/myblogs">个人文章</el-link></span>
            <el-divider direction="vertical"></el-divider>

<!--            <span><el-link type="success" href="/send">公屏聊天</el-link></span>-->
<!--            <el-divider direction="vertical"></el-divider>-->

            <span><el-link type="success" href="/blog/add">
                <i class="el-icon-edit">发布内容</i>
            </el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>

            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
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
            }
        },
        created() {
            this.onemy();
            //页面创建就会调用此方法
            console.log("用户名:"+this.$store.getters.getUser.username)  //获取用户名
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
.m-content{
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
}
    .maction {
        margin: 10px 0;
    }
</style>
