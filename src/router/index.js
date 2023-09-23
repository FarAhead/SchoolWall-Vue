import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {

    path: '/',
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import('../views/login/login.vue'),
    //hidden:true————不显示在侧边导航栏里
    hidden: true
  },
  {
    path: "/register",
    component: () => import('../views/login/register.vue'),
    //hidden:true————不显示在侧边导航栏里
    hidden: true
  },
  {
    path: "/admin",
    component:() => import('../views/admin/index.vue'),
    redirect: 'admin/home',
    children:[
      { path:'home', component:()=>import('../views/admin/home.vue')},
      { path:'reportVerify', component:()=>import('../views/admin/verify/reportVerify.vue')},
      { path:'newsVerify', component:()=>import('../views/admin/verify/newsVerify.vue')},
      { path:'orderManage', component:()=>import('../views/admin/manage/orderManege.vue')},
      { path:'userManage', component:()=>import('../views/admin/manage/userManage.vue')},
      { path:'questionManage', component:()=>import('../views/admin/manage/questionManage.vue')},
    ]
  },
  {
    path: "/organization",
    component:() => import('../views/organization/index.vue'),

    children:[
    ]
  },
  {
    path: "/student",
    component:() => import('../views/student/index.vue'),
    redirect: '/student/home',
    children:[
      { path:'home', component:()=>import('../views/student/home.vue')},
      { path:'orderSquare', component:()=>import('../views/student/order/orderSquare.vue')},
      { path:'newsSquare', component:()=>import('../views/student/news/newsSquare.vue')},
      { path:'questionSquare', component:()=>import('../views/student/question/questionSquare.vue')},
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
