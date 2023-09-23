<template>
    <div>
      <h3>后台管理系统</h3>

      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :router="true"
          >

          <el-menu-item index="/admin/home">
            <i class="el-icon-location"></i>
            <span>我的主页</span>
          </el-menu-item>

          <el-submenu>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容审核</span>
          </template>
          <el-menu-item index="reportVerify">举报审核</el-menu-item>
          <el-menu-item index="newsVerify">公告审核</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">信息管理</span>
          </template>
          <el-menu-item index="userManage">用户信息管理</el-menu-item>
          <el-menu-item index="orderManage">订单信息管理</el-menu-item>
          <el-menu-item index="questionManage">问题信息管理</el-menu-item>
        </el-submenu>

        <el-menu-item index="logout">
          <i class="el-icon-setting"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>


</template>

<script>
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/Aside";
</style>
