import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import Vuex from "vuex";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request = request
Vue.use(Vuex)

//在应用启动时，尝试从本地存储中获取用户信息，并将其设置到 Vuex 中
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo) {
  // 如果本地存储中有用户信息，则将其设置到 Vuex 中
  store.commit('SET_USER_INFO', userInfo);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
