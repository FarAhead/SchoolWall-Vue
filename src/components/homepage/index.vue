<template>
<div>
  <div class="homepage-container">
    <div class="home-header">
      <div class="home-user-info">
        <div class="home-user-avatar">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="60"></el-avatar>
        </div>
        <div class="home-user-name">

        </div>
      </div>
    </div>
    <div class="home-nav">
<!--      动态组件-->
      <component :is="currentNavbar"></component>
    </div>
    <div  class="home-content">

    </div>
  </div>
</div>
</template>

<script>
import stuHomeNav from "@/views/student/stuHomeNav.vue";
import orgHomeNav from "@/views/organization/orgHomeNav.vue";
export default {
  name: "index",
  components:{
    stuHomeNav,
    orgHomeNav
  },
  props:['uType'],
  computed:{
    currentNavbar(){
      return this.uType === 'student'?'stuHomeNav':'orgHomeNav';
    }
  }
}
</script>

<style scoped>

</style>
