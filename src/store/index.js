import Vue from 'vue'
import Vuex from 'vuex'
import OrganizationInfo from "@/store/modules/organizationInfo";


Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    OrganizationInfo
  },

})
export default store
