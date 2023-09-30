<template>
    <div class="aside-container">
      <div class="name-title">后台管理系统</div>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#607D8B"
          text-color="#fff"
          active-text-color="#FFF176"
          :collapse="isCollapse"
          :router="true"
          >

          <el-menu-item index="/admin/home" class="aside-item">
            <i class="el-icon-location"></i>
            <span>我的主页</span>
          </el-menu-item>

          <el-submenu >
          <template slot="title">
            <i class="el-icon-location" ></i>
            <span class="aside-item">内容审核</span>
          </template>
          <el-menu-item index="reportVerify">举报审核</el-menu-item>
          <el-menu-item index="newsVerify">公告审核</el-menu-item>
        </el-submenu>

        <el-submenu index="3" >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title" class="aside-item">信息管理</span>
          </template>
          <el-menu-item index="userManage">用户信息管理</el-menu-item>
          <el-menu-item index="orderManage">订单信息管理</el-menu-item>
          <el-menu-item index="questionManage">问题信息管理</el-menu-item>
        </el-submenu>

        <el-menu-item @click="logout" class="aside-item">
          <i class="el-icon-setting"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>


</template>

<script>
import organizationInfo from "@/store/modules/organizationInfo";
import studentInfo from "@/store/modules/studentInfo";

export default {
  name: "Aside",
  data(){
    return{
      isCollapse:false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      // 清除用户信息
      organizationInfo.commit('CLEAR_ORG_INFO');
      studentInfo.commit('CLEAR_STU_INFO');
      // 清除本地存储中的用户信息
      //localStorage.removeItem('userInfo');
      // 其他退出登录操作，如重定向到登录页等
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/Aside";

</style>
