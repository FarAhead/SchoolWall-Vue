import Vue from "vue";
import Vuex from "vuex";
//一个vuex插件，能够让网络刷新后保持登录状态
import createPersistedState from 'vuex-persistedstate'

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
        UPDATE_ORG_AVATAR(state, avatarURL){
            state.orgInfo.zavatar = avatarURL
        },
        CLEAR_ORG_INFO(state){
            state.orgInfo =null;
            state.isOrgLogged = false
        }
    },
    actions:{

    },
    getters:{

    },
    plugins: [createPersistedState()]
})



export default organizationInfo
