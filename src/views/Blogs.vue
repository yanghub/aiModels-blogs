<template>

  <div>
<!--    <div class="headerq">-->
<!--        <HeaderTop></HeaderTop>-->
<!--    </div>-->
<!--    <div class="main">-->
<!--            &lt;!&ndash;    博客列表&ndash;&gt;-->
<!--    -->
<!--    </div>-->
      <div class="mcontaner">
          <Header></Header>
          <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in imagesBox" :key="item.id">
                  <img :src="item.idView" class="image">
              </el-carousel-item>
          </el-carousel>
          <div class="block">
              <el-timeline>

                  <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
                      <el-card>
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
  </div>


</template>

<script>
    import Header from "../components/Header";
    // import HeaderTop from "../components/HeaderTop";
    export default {
        name: "Blogs",
        components: { Header},
        data() {
            //返回的信息
            return{
                imagesBox:[ //轮播图路径
                    {id:0,idView:require("../assets/img/index/index101.jpg")},
                    {id:1,idView:require("../assets/img/index/index102.jpg")},
                    {id:2,idView:require("../assets/img/index/index103.jpg")},
                    // {id:3,idView:require("../../assets/4.jpg")},
                ],
                fiveNews: [],  //轮播图
                blogs: {},
                currentPage: 1 , //当前页
                total: 0,    //总页数
                pagesize: 5  //每页数量
            }
        },
        methods: {

            page(currentPage){
                const  _this = this;
                _this.$axios.get("/blogs?currentPage="+currentPage).then(res =>{
                    // console.log("ccc")
                    // console.log(res.data.data)
                    _this.blogs =res.data.data.records //赋值
                    _this.currentPage =res.data.data.current
                    _this.total =res.data.data.total
                    _this.pagesize =res.data.data.size
                })
            }
        },
        created() {
            //此方法页面渲染就调用
            this.page(1)
            //用户修改
            // const  _this = this
            // const userId=this.$store.getters.getUser.id
            // _this.$axios.get("/info/"+userId).then(res =>{
            //     console.log("信息测试--")
            //     console.log(res.data.data)
            //     console.log("信息测试--")
            //     // _this.blogs =res.data.data.records //赋值
            // })
        }
    }
</script>

<style scoped>
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
    padding: 10px;
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
    /* background-color: red; */
  }

    .mpage{
        
        margin: 0 auto;
        text-align: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    /* 顶部导航 */
    

</style>
