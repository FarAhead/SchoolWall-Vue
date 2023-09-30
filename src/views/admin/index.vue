<template>
  <el-container style="height: 100vh;background-color: #F5F5F5" >
    <el-aside width="220px" class="el-aside">
      <Aside>
      </Aside>
    </el-aside>

    <el-container class="main-container">

      <el-header class="header">
        <Header></Header>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>

</template>

<script>
import Aside from '@/components/adminAside.vue'
import Header from "@/components/Header.vue";
export default {
  name: "index",
  components:{
    Header,
    Aside
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/Aside.less";
@import "@/assets/container.less";
</style>
