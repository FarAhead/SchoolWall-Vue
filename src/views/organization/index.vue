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

<style scoped>

</style>
