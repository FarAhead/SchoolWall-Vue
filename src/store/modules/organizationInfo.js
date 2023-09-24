import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const organizationInfo = new Vuex.Store({
    state:() =>({
        orgInfo:null,
        isOrgLogged:false
    }),
    mutations:{
        SET_ORG_INFO(state, userInfo){
            state.orgInfo = userInfo;
            state.isOrgLogged = true
        },
        CLEAR_ORG_INFO(state){
            state.orgInfo =null;
            state.isOrgLogged = false
        }
    },
    actions:{

    },
    getters:{

    }
})



export default organizationInfo
