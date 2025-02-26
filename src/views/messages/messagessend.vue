<template>

    <div>
        <Header></Header>
        <div style="height: 65vh;">
            <!-- 注意需要给 el-scrollbar 设置高度，判断是否滚动是看它的height判断的 -->
            <el-scrollbar style="height: 65%;"> <!-- 滚动条 -->
                <div>
<!--                    <span v-for="item in messages">{{item.greeting}}</span>-->
                    <span>{{messages.greeting}}</span>
                    <el-divider></el-divider>

                </div>

            </el-scrollbar> <!-- /滚动条 -->
            <div class="m-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item  label="" prop="content">
                        <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                v-model="ruleForm.content"
                                maxlength="30"
                                clearable
                                show-word-limit
                        >
                        </el-input>
                    </el-form-item>
                    <!--                    <div style="margin: 20px 0;"></div>-->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">发送消息</el-button>
                        <el-button type="primary" @click="connection ()">获取消息</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>

    </div>
    
</template>

<script>
    import Header from "../../components/Header";
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    export default {
        name: "messagessend",
        components: {Header},
        text: '',
        textarea: '',
        data() {
            return{
                stompClient:  '',
                timer: '',   //websocket使用
                remessages:'',

                textarea: '',
                reverse: true,
                activities: [{
                    content: '活动按期开始',
                    // timestamp: '2018-04-15'
                },
                ],
                rules: {
                    content: [
                        { required: true, message: '请输入发送消息',trigger: 'blur' }
                    ]
                },
                messages:{
                    // id:null,
                    // wid:null,
                    // name:"Name",
                    greeting:"接收消息",
                    // topic:"Topic",
                    // status:"1"
                },
                ruleForm: {
                    id:'',
                    userid:'',
                    username:'小羊',
                    title: '',
                    description: '',
                    content: '',
                    status:'',
                    greeting:'',
                    topic:'',
                },
                count: 10,
                // loading: false,
            }
        },
        computed:{
            noMore(){
                //   当循环添加的数据条数大于或等于总条数时停止加载
                return this.list.length >= this.total
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        mounted () {
            this.init();
            // this.connection();
            // this.timer = window.setInterval(() => {
            //     setTimeout(() => {
            //         this.connection()
            //     },0)
            // },1000);
        },
        beforeDestroy() {
            // 如果跳转别的页面的时候不仍保持websocket通信，此步可注释，否则定时器要清除
            //clearInterval(this.timer)
            this.disconnect()
        },
        methods: {
            //web start
            init () {
                this.connection()
                let _this = this
                // 断开重连机制
                this.timer = setInterval( () => {
                    try {
                        _this.stompClient.send('test123')
                    } catch (e) {
                        console.log('连接中断:' + e)
                        _this.connection()
                    }
                }, 10000)
            },
            connection () {
                let socket = new SockJS('http://localhost:8852/clientConnectThis'); //后端提供协议字段
                this.stompClient = Stomp.over(socket);
                let __this = this;
                const _this=this;
                this.stompClient.connect(
                    {},
                    function connectCallback() {
                        __this.stompClient.subscribe('/app/firstConnection', (response) => {//后端提供订阅地址
                            let returnData = JSON.parse(response.body);
                            _this.ruleForm.topic=returnData.topic;
                            console.log("连接成功");
                            console.log("接收到："+returnData.topic);  //接收后端response数据
                            console.log("前端接收到："+_this.ruleForm.topic)
                            // console.log(returnData.name);
                        });
                        __this.stompClient.subscribe('/user/kafka-user-id/queue/kafkaMsg', function (response) {
                            var returnData = JSON.parse(response.body);
                            _this.messages.greeting=returnData.greeting;
                            console.log("接收消息发送："+returnData.greeting);
                            // receiveText("Kafka 接收:(name=" + returnData.name + ",greeting=" + returnData.greeting + ",topic=" + returnData.topic + ",status=" + returnData.status + ")")
                        });
                    },
                    function errorCallBack(error) {
                        console.log('连接失败:' + error);
                    }
                )
            },
            disconnect () {
                //console.log(this.timer)
                //clearInterval(this.timer)
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
            },
            //websocket end
            // load(){
            //     this.loading=true
            //     // 改变页数并从新赋值
            //     this.pageNum=this.pageNum+1
            //     console.log(4444,this.pageNum)
            //     setTimeout(()=>{
            //         this.$axios.get(`http://192.168.124.25:8090/wf/search?pageNum=${this.pageNum}&pageSize=${this.pageSize}`,{ withCredentials: true }).then(res=>{
            //             if(res.data.info==="success"){
            //                 // 循环添加数据forEach方法
            //                 res.data.data.list.forEach(item => {
            //                     this.list.push(item)
            //                 })
            //                 // 循环添加数据for需循环方发
            //                 // for(var i = 0; i < list.length; i++){
            //                 //    then.list.push(list[i])
            //                 // }
            //                 this.loading=false
            //                 // 获取总数
            //                 this.total = res.data.data.total
            //             }
            //         })
            //     },1000)
            // },
        },
        //  请求违法代码接口
        created(){ // 创建页面前调用数据
            this.connection();

        },
        // destroyed() {
        //     // window.clearInterval(this.timer)
        // }
    }
</script>

<style scoped>
    .m-content{
        text-align: center;
    }
    #zi{
        width: 90%;
        margin: 0 auto;
        margin-bottom: 5rem;
    }
    .row-bg{
        /* height: 2rem; */
        line-height: 1.8rem;
    }
    .code{
        border-bottom: 1px solid #B4B4B4;
        padding: 0.5rem;
    }
    .hint{
        text-align: center;
        color: red;
    }
</style>
