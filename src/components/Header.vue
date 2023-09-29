<template>
<div class="header-container">

  <div class="left">
    <el-button type="primary" icon="el-icon-s-operation"></el-button>

  </div>

  <div class="search" style="display: flex">
    <span><el-input v-model="search" placeholder="请输入内容"></el-input></span>
    <span> <el-button icon="el-icon-search" ></el-button></span>

  </div>

<div class="right">
  <div class="user-info" style="display: flex">
    <div v-if="userType==='student'">
      <span>欢迎 {{stuName}} 同学</span>
      <el-avatar :src=studentInfo.state.stuInfo.uavatar></el-avatar>
    </div>
    <div v-else-if="userType==='organization'">
      <span>欢迎 {{orgName}} 的 {{orgUserName}}</span>
      <el-avatar :src="organizationInfo.state.orgInfo.zavatar"></el-avatar>
    </div>
    <div v-else><span>admin</span></div>

  </div>
</div>
</div>
</template>

<script>
import studentInfo from "@/store/modules/studentInfo";
import organizationInfo from "@/store/modules/organizationInfo";
export default {
  name: "Header",
  data(){
    return{
      search:"",
      avatar:"",

    }
  },

  computed:{
    organizationInfo() {
      return organizationInfo
    },
    studentInfo() {
      return studentInfo
    },
    userType(){
      if(studentInfo.state.isStuLogged){
        return 'student';
      } else if(organizationInfo.state.isOrgLogged){
        return 'organization';
      } else {
        return 'unknown';
      }
    },
    stuName(){
      return studentInfo.state.stuInfo.uname
    },
    orgName(){
      return organizationInfo.state.orgInfo.zname
    },
    orgUserName(){
      return organizationInfo.state.orgInfo.zstudent
    }
  },
  methods:{
    getAvatar(){
      if(this.userType === "student"){

      }
    }
  },



}
</script>

<style scoped>
.header-container{
  background-color: aqua;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
</style>
