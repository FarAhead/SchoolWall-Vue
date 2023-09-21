<template>
<div>
  <h1>你好，{{Name}}</h1>
  <h2>您所在的组织是：{{zName}}</h2>
  <el-button @click="logout">退出登录</el-button>
</div>
</template>

<script>

import store from "@/store";

export default {
  name: "index",
  computed: {
    Name() {
      return store.getters["userName"]
    },
    zName(){
      return store.getters["OrgName"]
    }
  },
  methods:{
    logout(){
      // 清除用户信息
      this.$store.commit('CLEAR_USER_INFO');
      // 清除本地存储中的用户信息
      localStorage.removeItem('userInfo');
      // 其他退出登录操作，如重定向到登录页等
      this.$router.push("/login");
    }
  }

}
</script>

<style scoped>

</style>
