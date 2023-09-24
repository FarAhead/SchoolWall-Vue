import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const studentInfo = new Vuex.Store({
    state:() =>({
        stuInfo:null,
        isStuLogged:false
    }),
    mutations:{
        SET_STU_INFO(state, userInfo){
            state.stuInfo = userInfo;
            state.isStuLogged = true
        },
        CLEAR_STU_INFO(state){
            state.stuInfo =null;
            state.isStuLogged = false
        }
    },
    actions:{

    },
    getters:{

    }
})



export default studentInfo
