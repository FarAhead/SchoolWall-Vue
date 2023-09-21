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

    children:[

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

    children:[

    ]
  },
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
