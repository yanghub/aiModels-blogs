//前置拦截和后置拦截全局配置
import router from './router'
import store from './store'
import  axios from 'axios'
import Element from 'element-ui'


axios.defaults.baseURL="http://127.0.0.1:9099"     //开发环境
//配置前置拦截
axios.interceptors.request.use(config =>{
    return config
})

//后置拦截
axios.interceptors.response.use(response =>{
    let res=response.data;
    console.log("============")
    console.log(res);                //传回后端返回值res
    console.log("============")

    if(res.code === 200){
        return response
    }else if (res.code === 201){
        Element.Message.success('注册成功',{duration :100});  //全局预先捕获用户不存在代码
    }else if (res.code === 601){
        Element.Message.error('用户已存在',{duration :100});  //全局预先捕获用户不存在代码
    } else{
        console.log(res.code)
        // Element.Message.error("其他错误~",{duration :3*1000});  //duration设置消失时间
        // return Promise.reject(response.data.msg)
        return response; // 需要返回原始响应或修改后的响应对象
    }




},error => {
    console.log(error)
      if(error.response.data){  //直接展示用户不存在信息
            error.message=error.response.data.msg
        }
        //获取用户不存在信息弹出来
        if(error.response.status === 401){
            store.commit("REMOVE_INFO")
            router.push("/login")   //跳转登录页面
        }else{

        }

        Element.Message.error(error.message,{duration :3*1000});  //duration设置消失时间
        return Promise.reject(error)   //阻止返回
    }

)
