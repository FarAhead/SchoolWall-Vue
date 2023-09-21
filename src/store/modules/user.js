const state = {
    userInfo:null
}

const mutations = {
    SET_USER_INFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR_USER_INFO(state){
      state.userInfo =null;
    }
}

const getters = {
    userName: state=>state.userInfo.zstudent,
    OrgName: state=>state.userInfo.zname
}

const actions = {

}

export default {
    state,
    mutations,
    getters,
    actions
}
