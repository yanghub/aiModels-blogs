import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import myBlogs from "../views/myblogs/myBlogs";
import UserEdit from "../views/useredit/UserEdit";
import messagessend from "../views/messages/messagessend";
import indenx from "../views/indenx";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: indenx,
    // redirect:{name: "Indenx"}   //重定向直接指向Blogs
  },
    {
      path: '/myblogs',
      name: 'myBiogs',
      component: myBlogs
    },
    {
      path: '/send',
      name: 'messagessend',
      component: messagessend
    },
    {
      path: '/useredit/add',
      name: 'UserEdit',
      component: UserEdit,
      meta: {
        requireAuth: true  //  权限设置，需要登录才可以访问
      }
    },
    {
      path: '/useredit:userInfoId',
      name: 'UserEdit',
      component: UserEdit
    },
    {
      path: '/useredit/:userInfoId/edit',
      name: 'UserEdit',
      component: UserEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/indenx',
      name: 'Indenx',
      component: indenx
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/blog/add',
      name: 'BlogAdd',
      component: BlogEdit,
      meta: {
        requireAuth: true  //  权限设置，需要登录才可以访问
      }
    },
    {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/deleteblogById/:blogId',
    //   name: 'deleteBiogs',
    //   component: Biogs
    // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
