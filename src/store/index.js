import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //属性
    token:'',
    //反序列化
    userInfo:JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    //通过这里修改set存浏览器
    SET_TOKEN:(state, token) =>{
      state.token =token
      localStorage.setItem("token",token)
    },
    SET_USERINFO:(state, userInfo) =>{
      state.userInfo = userInfo
      //关闭丢失
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO:(state, payload) => {
      state.token = ' '
      state.userInfo = { }
      localStorage.setItem("token",' ')
      sessionStorage.setItem("userInfo",JSON.stringify(' '))
    }
  },
  getters:{
    //get
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
