<template>
  <div class="aside-container">
    <div class="name-title">学生组织中心</div>

    <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#607D8B"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :router="true"
    >
      <el-menu-item index="/organization/home" class="aside-item">
        <i class="el-icon-location"></i>
        <span>组织首页</span>
      </el-menu-item>

      <el-menu-item @click="logout" class="aside-item">
        <i class="el-icon-setting"></i>
        <span slot="title" >退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import organizationInfo from "@/store/modules/organizationInfo";
export default {
  name: "organizationAside",
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
