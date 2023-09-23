<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <Aside>
      </Aside>
    </el-aside>

    <el-container>

      <el-header>
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

<style>

</style>
