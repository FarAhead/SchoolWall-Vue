<template>
  <div>
    <h3>校园墙</h3>

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
      <el-menu-item index="/student/questionSquare">
        <i class="el-icon-location"></i>
        <span>有问必答</span>
      </el-menu-item>

      <el-menu-item index="/student/orderSquare">
        <i class="el-icon-location"></i>
        <span>闲置交易</span>
      </el-menu-item>

      <el-menu-item index="/student/newsSquare">
        <i class="el-icon-location"></i>
        <span>公告中心</span>
      </el-menu-item>

      <el-menu-item index="/student/home">
        <i class="el-icon-location"></i>
        <span>我的主页</span>
      </el-menu-item>

      <el-menu-item index="logout">
        <i class="el-icon-setting"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "studentAside",
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
