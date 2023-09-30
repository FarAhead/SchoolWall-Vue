<template>
  <el-container style="height: 100vh;background-color: #F5F5F5">
    <el-aside width="220px"  class="el-aside">
      <Aside>
      </Aside>
    </el-aside>

    <el-container>

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


import Aside from '@/components/organizationAside.vue'
import Header from "@/components/Header.vue";

export default {
  name: "index",
  components:{
    Aside,
    Header
  },
  computed: {
    // Name() {
    //   return store.getters["userName"]
    // },
    // zName(){
    //   return store.getters["OrgName"]
    // }
  },
  methods:{

  }

}
</script>

<style lang="less" >
@import "@/assets/Aside.less";
@import "@/assets/container.less";
</style>
