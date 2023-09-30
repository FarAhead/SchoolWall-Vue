<template>
<div class="header-container">
  <div class="left">
    <el-button plain icon="el-icon-s-operation"></el-button>
  </div>

  <div class="search" style="display: flex">
    <span><el-input v-model="search" placeholder="请输入内容"></el-input></span>
    <span> <el-button icon="el-icon-search" ></el-button></span>
  </div>

<div class="right">
  <div class="user-info">
    <div v-if="userType==='student'" class="user-name" style="display: flex; align-items: center">
      <div style="margin-right: 20px;font-weight: bold ;color: #78909C">欢迎 {{stuName}}同学</div>
      <div style="margin-right: 10px"><el-avatar :src=studentInfo.state.stuInfo.uavatar :size="50" :fit="'cover'"></el-avatar></div>
    </div>
    <div v-else-if="userType==='organization'"class="user-name" style="display: flex; align-items: center">
      <div style="margin-right: 20px;font-weight: bold ;color: #78909C">欢迎 {{orgName}}的{{orgUserName}}</div>
      <div style="margin-right: 10px"><el-avatar :src="organizationInfo.state.orgInfo.zavatar" :size="50" :fit="'cover'"></el-avatar></div>
    </div>
    <div v-else><span style="margin-right: 20px;font-weight: bold ;color: #78909C">admin</span></div>
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

<style lang="less" scoped>
@import "@/assets/container.less";
</style>
