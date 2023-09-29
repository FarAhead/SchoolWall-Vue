<template>
<div>
  <div class="homepage-container">
    <div class="home-header">
      <div class="home-user-info">
        <div class="home-user-avatar">
          <el-avatar :src="userAvatar" :size="60"></el-avatar>
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
import stuHomeNav from "@/views/student/navigation/stuHomeNav.vue";
import orgHomeNav from "@/views/organization/orgHomeNav.vue";
import studentInfo from "@/store/modules/studentInfo";
import organizationInfo from "@/store/modules/organizationInfo";
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
    },
    userAvatar(){
      if (this.$props.uType === 'student'){
        return studentInfo.state.stuInfo.uavatar;
      } else {
        return  organizationInfo.state.orgInfo.zavatar;
      }
    }
  }
}
</script>

<style scoped>

</style>
