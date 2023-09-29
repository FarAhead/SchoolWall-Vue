<template>
<div class="header-container">

  <div class="left">
    <el-button type="primary" icon="el-icon-s-operation"></el-button>
    左侧按钮，实现侧边栏伸缩
  </div>

  <div class="search">
    这是放在中间的内容，还没想好

  </div>

<div class="right">
  <div class="user-info" style="display: flex">
    <div v-if="userType==='student'"><span>欢迎 {{stuName}} 同学</span></div>
    <div v-else-if="userType==='organization'"><span>欢迎 {{orgName}} 的 {{orgUserName}}</span></div>
    <div v-else><span>请先登录</span></div>
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
      avatar:"",
      input:{

      }
    }
  },

  computed:{
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
