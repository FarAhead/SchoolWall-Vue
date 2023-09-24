import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import Vuex from "vuex";

import studentInfo from "@/store/modules/studentInfo";
import organizationInfo from "@/store/modules/organizationInfo";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request = request
Vue.use(Vuex)

//在应用启动时，尝试从本地存储中获取用户信息，并将其设置到 Vuex 中
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// 如果本地存储中有用户信息，则将其设置到 Vuex 中
if (userInfo) {
  if (userInfo.utype == "1") {
    organizationInfo.commit('SET_ORG_INFO', userInfo);
  } else if (userInfo.utype == "2") {
    studentInfo.commit('SET_STU_INFO', userInfo)
  } else {
    //有信息，但是是管理员
  }
  } else {
  //没有登录信息
}

new Vue({
  router,
  studentInfo,
  organizationInfo,
  render: h => h(App)
}).$mount('#app')
